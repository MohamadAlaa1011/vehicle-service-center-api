import { PaginationDto } from '../../../common/dto/pagination.dto';
import { FuelType } from '../../../common/enums/fuel-type.enum';
export declare class QueryVehicleDto extends PaginationDto {
    customerId?: string;
    make?: string;
    year?: number;
    fuelType?: FuelType;
}
