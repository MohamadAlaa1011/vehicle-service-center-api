import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Customer } from '../customers/entities/customer.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { CreateVehicleDto, UpdateVehicleDto, QueryVehicleDto } from './dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
export declare class VehiclesService {
    private vehicleRepository;
    private customerRepository;
    private serviceOrderRepository;
    constructor(vehicleRepository: Repository<Vehicle>, customerRepository: Repository<Customer>, serviceOrderRepository: Repository<ServiceOrder>);
    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(queryDto: QueryVehicleDto): Promise<PaginationResponseDto<Vehicle>>;
    findOne(id: string): Promise<Vehicle>;
    update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: string): Promise<void>;
    getVehicleServiceHistory(vehicleId: string, queryDto: QueryVehicleDto): Promise<PaginationResponseDto<ServiceOrder>>;
    updateMileage(vehicleId: string, newMileage: number): Promise<Vehicle>;
}
