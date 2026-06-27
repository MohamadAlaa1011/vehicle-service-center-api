import { CreateServiceOrderDto } from './create-service-order.dto';
import { ServiceOrderStatus } from '../../../common/enums/service-order-status.enum';
import { ServiceOrderPriority } from '../../../common/enums/service-order-priority.enum';
declare const UpdateServiceOrderDto_base: import("@nestjs/common").Type<Partial<CreateServiceOrderDto>>;
export declare class UpdateServiceOrderDto extends UpdateServiceOrderDto_base {
    diagnosis?: string;
    status?: ServiceOrderStatus;
    laborCost?: number;
    priority?: ServiceOrderPriority;
    completionDate?: string;
}
export {};
