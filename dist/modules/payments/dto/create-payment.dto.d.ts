import { PaymentMethod } from '../../../common/enums/payment-method.enum';
export declare class CreatePaymentDto {
    invoiceId: string;
    paymentMethod: PaymentMethod;
    amount: number;
    transactionReference?: string;
}
