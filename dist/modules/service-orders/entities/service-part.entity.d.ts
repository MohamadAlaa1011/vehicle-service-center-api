import { BaseEntity } from '../../../common/base/base.entity';
import { ServiceOrder } from './service-order.entity';
import { SparePart } from '../../spare-parts/entities/spare-part.entity';
export declare class ServicePart extends BaseEntity {
    serviceOrderId: string;
    partId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    serviceOrder: ServiceOrder;
    part: SparePart;
}
