import { SparePartsService } from './spare-parts.service';
import { CreateSparePartDto, UpdateSparePartDto, QuerySparePartDto, AdjustStockDto } from './dto';
import { SparePart } from './entities/spare-part.entity';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
export declare class SparePartsController {
    private readonly sparePartsService;
    constructor(sparePartsService: SparePartsService);
    create(createSparePartDto: CreateSparePartDto): Promise<SparePart>;
    findAll(queryDto: QuerySparePartDto): Promise<PaginationResponseDto<SparePart>>;
    getLowStockAlerts(): Promise<SparePart[]>;
    getPartsByCategory(): Promise<{
        category: string;
        count: number;
        totalValue: number;
    }[]>;
    findOne(id: string): Promise<SparePart>;
    update(id: string, updateSparePartDto: UpdateSparePartDto): Promise<SparePart>;
    remove(id: string): Promise<{
        message: string;
    }>;
    adjustStock(id: string, adjustStockDto: AdjustStockDto): Promise<SparePart>;
}
