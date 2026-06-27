import { Repository, DataSource } from 'typeorm';
import { ServiceOrder } from './entities/service-order.entity';
import { ServicePart } from './entities/service-part.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Mechanic } from '../mechanics/entities/mechanic.entity';
import { SparePart } from '../spare-parts/entities/spare-part.entity';
import { InventoryTransaction } from '../inventory-transactions/entities/inventory-transaction.entity';
import { CreateServiceOrderDto, UpdateServiceOrderDto, QueryServiceOrderDto, AddPartsDto } from './dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
export declare class ServiceOrdersService {
    private serviceOrderRepository;
    private servicePartRepository;
    private customerRepository;
    private vehicleRepository;
    private mechanicRepository;
    private sparePartRepository;
    private inventoryTransactionRepository;
    private dataSource;
    constructor(serviceOrderRepository: Repository<ServiceOrder>, servicePartRepository: Repository<ServicePart>, customerRepository: Repository<Customer>, vehicleRepository: Repository<Vehicle>, mechanicRepository: Repository<Mechanic>, sparePartRepository: Repository<SparePart>, inventoryTransactionRepository: Repository<InventoryTransaction>, dataSource: DataSource);
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
    private generateOrderNumber;
}
