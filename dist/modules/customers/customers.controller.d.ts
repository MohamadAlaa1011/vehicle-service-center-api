import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto, QueryCustomerDto } from './dto';
import { Customer } from './entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    findAll(queryDto: QueryCustomerDto): Promise<PaginationResponseDto<Customer>>;
    findOne(id: string): Promise<Customer>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getCustomerVehicles(id: string, queryDto: QueryCustomerDto): Promise<PaginationResponseDto<Vehicle>>;
    getCustomerServiceHistory(id: string, queryDto: QueryCustomerDto): Promise<PaginationResponseDto<ServiceOrder>>;
}
