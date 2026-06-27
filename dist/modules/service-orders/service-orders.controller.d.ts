import { ServiceOrdersService } from './service-orders.service';
import { ServiceOrder } from './entities/service-order.entity';
import { CreateServiceOrderDto, UpdateServiceOrderDto, QueryServiceOrderDto, AddPartsDto } from './dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
export declare class ServiceOrdersController {
    private readonly serviceOrdersService;
    constructor(serviceOrdersService: ServiceOrdersService);
    create(createServiceOrderDto: CreateServiceOrderDto): Promise<ServiceOrder>;
    findAll(query: QueryServiceOrderDto): Promise<PaginationResponseDto<ServiceOrder>>;
    findOne(id: string): Promise<ServiceOrder>;
    update(id: string, updateServiceOrderDto: UpdateServiceOrderDto): Promise<ServiceOrder>;
    remove(id: string): Promise<void>;
    addParts(id: string, addPartsDto: AddPartsDto): Promise<ServiceOrder>;
    getServiceHistory(vehicleId: string): Promise<ServiceOrder[]>;
    getTotalCost(id: string): Promise<{
        laborCost: number;
        partsCost: number;
        totalCost: number;
    }>;
}
