import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, UpdateVehicleDto, QueryVehicleDto } from './dto';
import { Vehicle } from './entities/vehicle.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(queryDto: QueryVehicleDto): Promise<PaginationResponseDto<Vehicle>>;
    findOne(id: string): Promise<Vehicle>;
    update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getVehicleServiceHistory(id: string, queryDto: QueryVehicleDto): Promise<PaginationResponseDto<ServiceOrder>>;
    updateMileage(id: string, body: {
        mileage: number;
    }): Promise<Vehicle>;
}
