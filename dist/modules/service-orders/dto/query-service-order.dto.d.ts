import { PaginationDto } from '../../../common/dto/pagination.dto';
import { ServiceOrderStatus } from '../../../common/enums/service-order-status.enum';
import { ServiceOrderPriority } from '../../../common/enums/service-order-priority.enum';
export declare class QueryServiceOrderDto extends PaginationDto {
    customerId?: string;
    vehicleId?: string;
    mechanicId?: string;
    status?: ServiceOrderStatus;
    priority?: ServiceOrderPriority;
    search?: string;
}
