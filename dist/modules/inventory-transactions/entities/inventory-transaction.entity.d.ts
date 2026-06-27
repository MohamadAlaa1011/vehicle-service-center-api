import { BaseEntity } from '../../../common/base/base.entity';
import { TransactionType } from '../../../common/enums/transaction-type.enum';
import { SparePart } from '../../spare-parts/entities/spare-part.entity';
export declare class InventoryTransaction extends BaseEntity {
    partId: string;
    type: TransactionType;
    quantity: number;
    reason?: string;
    referenceId?: string;
    part: SparePart;
}
