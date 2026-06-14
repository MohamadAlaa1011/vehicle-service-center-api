import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Customer } from '../customers/entities/customer.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { CreateVehicleDto, UpdateVehicleDto, QueryVehicleDto } from './dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(ServiceOrder)
    private serviceOrderRepository: Repository<ServiceOrder>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const { customerId, plateNumber, vinNumber, ...vehicleData } = createVehicleDto;

    // Verify customer exists
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    // Check for plate number conflicts
    const existingVehicleByPlate = await this.vehicleRepository.findOne({
      where: { plateNumber },
    });

    if (existingVehicleByPlate) {
      throw new ConflictException('Vehicle with this plate number already exists');
    }

    // Check for VIN conflicts if provided
    if (vinNumber) {
      const existingVehicleByVin = await this.vehicleRepository.findOne({
        where: { vinNumber },
      });

      if (existingVehicleByVin) {
        throw new ConflictException('Vehicle with this VIN already exists');
      }
    }

    const vehicle = this.vehicleRepository.create({
      ...vehicleData,
      customerId,
      plateNumber,
      vinNumber,
    });

    return this.vehicleRepository.save(vehicle);
  }

  async findAll(queryDto: QueryVehicleDto): Promise<PaginationResponseDto<Vehicle>> {
    const {
      page = 1,
      limit = 20,
      search,
      customerId,
      make,
      year,
      fuelType,
      sortBy = 'createdAt',
      order = 'DESC',
    } = queryDto;

    const queryOptions: FindManyOptions<Vehicle> = {
      relations: ['customer'],
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: order },
    };

    // Build where conditions
    const whereConditions: any = {};

    if (customerId) {
      whereConditions.customerId = customerId;
    }

    if (make) {
      whereConditions.make = make;
    }

    if (year) {
      whereConditions.year = year;
    }

    if (fuelType) {
      whereConditions.fuelType = fuelType;
    }

    // Handle search across multiple fields
    if (search) {
      const searchConditions = [
        { ...whereConditions, make: Like(`%${search}%`) },
        { ...whereConditions, model: Like(`%${search}%`) },
        { ...whereConditions, plateNumber: Like(`%${search}%`) },
        { ...whereConditions, vinNumber: Like(`%${search}%`) },
        { ...whereConditions, color: Like(`%${search}%`) },
      ];

      queryOptions.where = searchConditions;
    } else {
      queryOptions.where = whereConditions;
    }

    const [vehicles, total] = await this.vehicleRepository.findAndCount(queryOptions);

    return new PaginationResponseDto(vehicles, page, limit, total);
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: ['customer', 'appointments', 'serviceOrders'],
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.findOne(id);

    const { plateNumber, vinNumber, ...updateData } = updateVehicleDto;

    // Check for plate number conflicts if updating
    if (plateNumber && plateNumber !== vehicle.plateNumber) {
      const existingVehicle = await this.vehicleRepository.findOne({
        where: { plateNumber },
      });

      if (existingVehicle) {
        throw new ConflictException('Vehicle with this plate number already exists');
      }
    }

    // Check for VIN conflicts if updating
    if (vinNumber && vinNumber !== vehicle.vinNumber) {
      const existingVehicle = await this.vehicleRepository.findOne({
        where: { vinNumber },
      });

      if (existingVehicle) {
        throw new ConflictException('Vehicle with this VIN already exists');
      }
    }

    await this.vehicleRepository.update(id, {
      ...updateData,
      ...(plateNumber && { plateNumber }),
      ...(vinNumber && { vinNumber }),
    });

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.softDelete(id);
  }

  async getVehicleServiceHistory(vehicleId: string, queryDto: QueryVehicleDto): Promise<PaginationResponseDto<ServiceOrder>> {
    // Verify vehicle exists
    await this.findOne(vehicleId);

    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'DESC',
    } = queryDto;

    const queryOptions: FindManyOptions<ServiceOrder> = {
      where: { vehicleId },
      relations: ['customer', 'assignedMechanic', 'serviceParts', 'invoice'],
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: order },
    };

    const [serviceOrders, total] = await this.serviceOrderRepository.findAndCount(queryOptions);

    return new PaginationResponseDto(serviceOrders, page, limit, total);
  }

  async updateMileage(vehicleId: string, newMileage: number): Promise<Vehicle> {
    const vehicle = await this.findOne(vehicleId);

    if (newMileage < 0) {
      throw new BadRequestException('Mileage cannot be negative');
    }

    if (vehicle.mileage && newMileage < vehicle.mileage) {
      throw new BadRequestException('New mileage cannot be less than current mileage');
    }

    await this.vehicleRepository.update(vehicleId, { mileage: newMileage });
    return this.findOne(vehicleId);
  }
}