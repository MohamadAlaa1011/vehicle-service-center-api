import { Repository, DataSource } from 'typeorm';
import { SparePart } from './entities/spare-part.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { InventoryTransaction } from '../inventory-transactions/entities/inventory-transaction.entity';
import { CreateSparePartDto, UpdateSparePartDto, QuerySparePartDto, AdjustStockDto } from './dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
export declare class SparePartsService {
    private sparePartRepository;
    private supplierRepository;
    private inventoryTransactionRepository;
    private dataSource;
    constructor(sparePartRepository: Repository<SparePart>, supplierRepository: Repository<Supplier>, inventoryTransactionRepository: Repository<InventoryTransaction>, dataSource: DataSource);
    create(createSparePartDto: CreateSparePartDto): Promise<SparePart>;
    findAll(queryDto: QuerySparePartDto): Promise<PaginationResponseDto<SparePart>>;
    findOne(id: string): Promise<SparePart>;
    update(id: string, updateSparePartDto: UpdateSparePartDto): Promise<SparePart>;
    remove(id: string): Promise<void>;
    getLowStockAlerts(): Promise<SparePart[]>;
    adjustStock(id: string, adjustStockDto: AdjustStockDto): Promise<SparePart>;
    private createInventoryTransaction;
    getPartsByCategory(): Promise<{
        category: string;
        count: number;
        totalValue: number;
    }[]>;
}
