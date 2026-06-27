import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { CreateCustomerDto, UpdateCustomerDto, QueryCustomerDto } from './dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
export declare class CustomersService {
    private customerRepository;
    private vehicleRepository;
    private serviceOrderRepository;
    constructor(customerRepository: Repository<Customer>, vehicleRepository: Repository<Vehicle>, serviceOrderRepository: Repository<ServiceOrder>);
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    findAll(queryDto: QueryCustomerDto): Promise<PaginationResponseDto<Customer>>;
    findOne(id: string): Promise<Customer>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
    remove(id: string): Promise<void>;
    getCustomerVehicles(customerId: string, queryDto: QueryCustomerDto): Promise<PaginationResponseDto<Vehicle>>;
    getCustomerServiceHistory(customerId: string, queryDto: QueryCustomerDto): Promise<PaginationResponseDto<ServiceOrder>>;
}
