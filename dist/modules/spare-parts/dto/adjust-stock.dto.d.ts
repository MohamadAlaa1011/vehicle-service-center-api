import { TransactionType } from '../../../common/enums/transaction-type.enum';
export declare class AdjustStockDto {
    type: TransactionType;
    quantity: number;
    reason?: string;
}
