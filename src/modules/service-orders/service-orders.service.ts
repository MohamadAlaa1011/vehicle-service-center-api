import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, Like } from 'typeorm';
import { ServiceOrder } from './entities/service-order.entity';
import { ServicePart } from './entities/service-part.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Mechanic } from '../mechanics/entities/mechanic.entity';
import { SparePart } from '../spare-parts/entities/spare-part.entity';
import { InventoryTransaction } from '../inventory-transactions/entities/inventory-transaction.entity';
import { CreateServiceOrderDto, UpdateServiceOrderDto, QueryServiceOrderDto, AddPartsDto } from './dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
import { ServiceOrderStatus } from '../../common/enums/service-order-status.enum';
import { TransactionType } from '../../common/enums/transaction-type.enum';

@Injectable()
export class ServiceOrdersService {
  constructor(
    @InjectRepository(ServiceOrder)
    private serviceOrderRepository: Repository<ServiceOrder>,
    @InjectRepository(ServicePart)
    private servicePartRepository: Repository<ServicePart>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Mechanic)
    private mechanicRepository: Repository<Mechanic>,
    @InjectRepository(SparePart)
    private sparePartRepository: Repository<SparePart>,
    @InjectRepository(InventoryTransaction)
    private inventoryTransactionRepository: Repository<InventoryTransaction>,
    private dataSource: DataSource,
  ) {}

  async create(createServiceOrderDto: CreateServiceOrderDto): Promise<ServiceOrder> {
    // Validate customer exists
    const customer = await this.customerRepository.findOne({
      where: { id: createServiceOrderDto.customerId },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${createServiceOrderDto.customerId} not found`);
    }

    // Validate vehicle exists and belongs to customer
    const vehicle = await this.vehicleRepository.findOne({
      where: { 
        id: createServiceOrderDto.vehicleId,
        customerId: createServiceOrderDto.customerId,
      },
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${createServiceOrderDto.vehicleId} not found for this customer`);
    }

    // Validate mechanic if provided
    if (createServiceOrderDto.assignedMechanicId) {
      const mechanic = await this.mechanicRepository.findOne({
        where: { id: createServiceOrderDto.assignedMechanicId },
      });
      if (!mechanic) {
        throw new NotFoundException(`Mechanic with ID ${createServiceOrderDto.assignedMechanicId} not found`);
      }
    }

    // Generate unique order number
    const orderNumber = await this.generateOrderNumber();

    const serviceOrder = this.serviceOrderRepository.create({
      ...createServiceOrderDto,
      orderNumber,
      laborCost: createServiceOrderDto.laborCost || 0,
      startDate: createServiceOrderDto.startDate ? new Date(createServiceOrderDto.startDate) : undefined,
    });

    return await this.serviceOrderRepository.save(serviceOrder);
  }

  async findAll(query: QueryServiceOrderDto): Promise<PaginationResponseDto<ServiceOrder>> {
    const { page = 1, limit = 20, customerId, vehicleId, mechanicId, status, priority, search } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.serviceOrderRepository
      .createQueryBuilder('serviceOrder')
      .leftJoinAndSelect('serviceOrder.customer', 'customer')
      .leftJoinAndSelect('serviceOrder.vehicle', 'vehicle')
      .leftJoinAndSelect('serviceOrder.assignedMechanic', 'mechanic')
      .leftJoinAndSelect('mechanic.user', 'mechanicUser')
      .leftJoinAndSelect('serviceOrder.serviceParts', 'serviceParts')
      .leftJoinAndSelect('serviceParts.part', 'part');

    if (customerId) {
      queryBuilder.andWhere('serviceOrder.customerId = :customerId', { customerId });
    }

    if (vehicleId) {
      queryBuilder.andWhere('serviceOrder.vehicleId = :vehicleId', { vehicleId });
    }

    if (mechanicId) {
      queryBuilder.andWhere('serviceOrder.assignedMechanicId = :mechanicId', { mechanicId });
    }

    if (status) {
      queryBuilder.andWhere('serviceOrder.status = :status', { status });
    }

    if (priority) {
      queryBuilder.andWhere('serviceOrder.priority = :priority', { priority });
    }

    if (search) {
      queryBuilder.andWhere(
        '(serviceOrder.orderNumber ILIKE :search OR serviceOrder.issueDescription ILIKE :search OR serviceOrder.diagnosis ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    const [data, total] = await queryBuilder
      .orderBy('serviceOrder.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return new PaginationResponseDto(data, page, limit, total);
  }

  async findOne(id: string): Promise<ServiceOrder> {
    const serviceOrder = await this.serviceOrderRepository.findOne({
      where: { id },
      relations: [
        'customer',
        'vehicle',
        'assignedMechanic',
        'assignedMechanic.user',
        'serviceParts',
        'serviceParts.part',
        'invoice',
        'invoice.payments',
      ],
    });

    if (!serviceOrder) {
      throw new NotFoundException(`Service order with ID ${id} not found`);
    }

    return serviceOrder;
  }

  async update(id: string, updateServiceOrderDto: UpdateServiceOrderDto): Promise<ServiceOrder> {
    const serviceOrder = await this.findOne(id);

    // Validate mechanic if being updated
    if (updateServiceOrderDto.assignedMechanicId) {
      const mechanic = await this.mechanicRepository.findOne({
        where: { id: updateServiceOrderDto.assignedMechanicId },
      });
      if (!mechanic) {
        throw new NotFoundException(`Mechanic with ID ${updateServiceOrderDto.assignedMechanicId} not found`);
      }
    }

    // Update completion date when status changes to completed
    if (updateServiceOrderDto.status === ServiceOrderStatus.COMPLETED && !serviceOrder.completionDate) {
      updateServiceOrderDto.completionDate = new Date().toISOString();
    }

    Object.assign(serviceOrder, {
      ...updateServiceOrderDto,
      startDate: updateServiceOrderDto.startDate ? new Date(updateServiceOrderDto.startDate) : serviceOrder.startDate,
      completionDate: updateServiceOrderDto.completionDate ? new Date(updateServiceOrderDto.completionDate) : serviceOrder.completionDate,
    });

    return await this.serviceOrderRepository.save(serviceOrder);
  }

  async remove(id: string): Promise<void> {
    const serviceOrder = await this.findOne(id);
    
    if (serviceOrder.status !== ServiceOrderStatus.PENDING) {
      throw new BadRequestException('Only pending service orders can be deleted');
    }

    await this.serviceOrderRepository.softDelete(id);
  }

  async addParts(id: string, addPartsDto: AddPartsDto): Promise<ServiceOrder> {
    return await this.dataSource.transaction(async manager => {
      const serviceOrder = await manager.findOne(ServiceOrder, {
        where: { id },
        relations: ['serviceParts'],
      });

      if (!serviceOrder) {
        throw new NotFoundException(`Service order with ID ${id} not found`);
      }

      if (serviceOrder.status === ServiceOrderStatus.COMPLETED) {
        throw new BadRequestException('Cannot add parts to completed service order');
      }

      for (const partDto of addPartsDto.parts) {
        // Validate spare part exists and has sufficient quantity
        const sparePart = await manager.findOne(SparePart, {
          where: { id: partDto.partId },
        });

        if (!sparePart) {
          throw new NotFoundException(`Spare part with ID ${partDto.partId} not found`);
        }

        if (sparePart.quantity < partDto.quantity) {
          throw new BadRequestException(
            `Insufficient quantity for part ${sparePart.name}. Available: ${sparePart.quantity}, Required: ${partDto.quantity}`
          );
        }

        // Create service part entry
        const unitPrice = partDto.unitPrice || parseFloat(sparePart.sellingPrice.toString());
        const totalPrice = unitPrice * partDto.quantity;

        const servicePart = manager.create(ServicePart, {
          serviceOrderId: id,
          partId: partDto.partId,
          quantity: partDto.quantity,
          unitPrice,
          totalPrice,
        });

        await manager.save(ServicePart, servicePart);

        // Update spare part quantity
        sparePart.quantity -= partDto.quantity;
        await manager.save(SparePart, sparePart);

        // Create inventory transaction
        const inventoryTransaction = manager.create(InventoryTransaction, {
          partId: partDto.partId,
          type: TransactionType.SALE,
          quantity: -partDto.quantity, // Negative for outgoing
          reason: `Used in service order ${serviceOrder.orderNumber}`,
          referenceId: id,
        });

        await manager.save(InventoryTransaction, inventoryTransaction);
      }

      const updatedServiceOrder = await manager.findOne(ServiceOrder, {
        where: { id },
        relations: [
          'customer',
          'vehicle',
          'assignedMechanic',
          'assignedMechanic.user',
          'serviceParts',
          'serviceParts.part',
        ],
      });

      if (!updatedServiceOrder) {
        throw new NotFoundException(`Service order with ID ${id} not found after update`);
      }

      return updatedServiceOrder;
    });
  }

  async getServiceHistory(vehicleId: string): Promise<ServiceOrder[]> {
    return await this.serviceOrderRepository.find({
      where: { vehicleId },
      relations: [
        'assignedMechanic',
        'assignedMechanic.user',
        'serviceParts',
        'serviceParts.part',
        'invoice',
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async getTotalCost(id: string): Promise<{ laborCost: number; partsCost: number; totalCost: number }> {
    const serviceOrder = await this.serviceOrderRepository.findOne({
      where: { id },
      relations: ['serviceParts'],
    });

    if (!serviceOrder) {
      throw new NotFoundException(`Service order with ID ${id} not found`);
    }

    const laborCost = parseFloat(serviceOrder.laborCost.toString());
    const partsCost = serviceOrder.serviceParts?.reduce(
      (sum, servicePart) => sum + parseFloat(servicePart.totalPrice.toString()),
      0
    ) || 0;

    return {
      laborCost,
      partsCost,
      totalCost: laborCost + partsCost,
    };
  }

  private async generateOrderNumber(): Promise<string> {
    const prefix = 'SO';
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    // Find the latest order number for this month
    const latestOrder = await this.serviceOrderRepository
      .createQueryBuilder('serviceOrder')
      .where('serviceOrder.orderNumber LIKE :pattern', { 
        pattern: `${prefix}${year}${month}%` 
      })
      .orderBy('serviceOrder.orderNumber', 'DESC')
      .getOne();

    let sequence = 1;
    if (latestOrder) {
      const lastSequence = parseInt(latestOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }

    return `${prefix}${year}${month}${sequence.toString().padStart(4, '0')}`;
  }
}