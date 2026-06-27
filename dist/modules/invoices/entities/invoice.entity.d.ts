import { BaseEntity } from '../../../common/base/base.entity';
import { InvoiceStatus } from '../../../common/enums/invoice-status.enum';
import { ServiceOrder } from '../../service-orders/entities/service-order.entity';
import { Payment } from '../../payments/entities/payment.entity';
export declare class Invoice extends BaseEntity {
    invoiceNumber: string;
    serviceOrderId: string;
    laborAmount: number;
    partsAmount: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status: InvoiceStatus;
    serviceOrder: ServiceOrder;
    payments?: Payment[];
}
