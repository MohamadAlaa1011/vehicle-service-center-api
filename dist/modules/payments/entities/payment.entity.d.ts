import { BaseEntity } from '../../../common/base/base.entity';
import { PaymentMethod } from '../../../common/enums/payment-method.enum';
import { Invoice } from '../../invoices/entities/invoice.entity';
export declare class Payment extends BaseEntity {
    invoiceId: string;
    paymentMethod: PaymentMethod;
    amount: number;
    paymentDate: Date;
    transactionReference?: string;
    invoice: Invoice;
}
