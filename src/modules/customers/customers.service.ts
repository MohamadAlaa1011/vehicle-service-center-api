import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { CreateCustomerDto, UpdateCustomerDto, QueryCustomerDto } from './dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(ServiceOrder)
    private serviceOrderRepository: Repository<ServiceOrder>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    // Check if customer with same email already exists (if email provided)
    if (createCustomerDto.email) {
      const existingCustomer = await this.customerRepository.findOne({
        where: { email: createCustomerDto.email },
      });

      if (existingCustomer) {
        throw new ConflictException('Customer with this email already exists');
      }
    }

    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async findAll(queryDto: QueryCustomerDto): Promise<PaginationResponseDto<Customer>> {
    const {
      page = 1,
      limit = 20,
      search,
      sortBy = 'createdAt',
      order = 'DESC',
    } = queryDto;

    const queryOptions: FindManyOptions<Customer> = {
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: order },
    };

    // Build where conditions
    if (search) {
      queryOptions.where = [
        { fullName: Like(`%${search}%`) },
        { email: Like(`%${search}%`) },
        { phone: Like(`%${search}%`) },
      ];
    }

    const [customers, total] = await this.customerRepository.findAndCount(queryOptions);

    return new PaginationResponseDto(customers, page, limit, total);
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['vehicles', 'appointments', 'serviceOrders'],
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);

    // Check for email conflicts if email is being updated
    if (updateCustomerDto.email && updateCustomerDto.email !== customer.email) {
      const existingCustomer = await this.customerRepository.findOne({
        where: { email: updateCustomerDto.email },
      });

      if (existingCustomer) {
        throw new ConflictException('Customer with this email already exists');
      }
    }

    await this.customerRepository.update(id, updateCustomerDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const customer = await this.findOne(id);
    await this.customerRepository.softDelete(id);
  }

  async getCustomerVehicles(customerId: string, queryDto: QueryCustomerDto): Promise<PaginationResponseDto<Vehicle>> {
    // Verify customer exists
    await this.findOne(customerId);

    const {
      page = 1,
      limit = 20,
      search,
      sortBy = 'createdAt',
      order = 'DESC',
    } = queryDto;

    const queryOptions: FindManyOptions<Vehicle> = {
      where: { customerId },
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: order },
    };

    // Build search conditions for vehicles
    if (search) {
      queryOptions.where = [
        { customerId, make: Like(`%${search}%`) },
        { customerId, model: Like(`%${search}%`) },
        { customerId, plateNumber: Like(`%${search}%`) },
        { customerId, vinNumber: Like(`%${search}%`) },
      ];
    }

    const [vehicles, total] = await this.vehicleRepository.findAndCount(queryOptions);

    return new PaginationResponseDto(vehicles, page, limit, total);
  }

  async getCustomerServiceHistory(customerId: string, queryDto: QueryCustomerDto): Promise<PaginationResponseDto<ServiceOrder>> {
    // Verify customer exists
    await this.findOne(customerId);

    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'DESC',
    } = queryDto;

    const queryOptions: FindManyOptions<ServiceOrder> = {
      where: { customerId },
      relations: ['vehicle', 'assignedMechanic', 'serviceParts', 'invoice'],
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: order },
    };

    const [serviceOrders, total] = await this.serviceOrderRepository.findAndCount(queryOptions);

    return new PaginationResponseDto(serviceOrders, page, limit, total);
  }
}