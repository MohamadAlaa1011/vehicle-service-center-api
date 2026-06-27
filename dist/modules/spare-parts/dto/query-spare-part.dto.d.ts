import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class QuerySparePartDto extends PaginationDto {
    category?: string;
    supplierId?: string;
    lowStock?: boolean;
}
