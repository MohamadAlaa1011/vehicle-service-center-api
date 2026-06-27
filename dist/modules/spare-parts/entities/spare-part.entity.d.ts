import { BaseEntity } from '../../../common/base/base.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { ServicePart } from '../../service-orders/entities/service-part.entity';
import { InventoryTransaction } from '../../inventory-transactions/entities/inventory-transaction.entity';
export declare class SparePart extends BaseEntity {
    sku: string;
    name: string;
    category: string;
    description?: string;
    quantity: number;
    minimumStock: number;
    purchasePrice: number;
    sellingPrice: number;
    supplierId: string;
    supplier: Supplier;
    serviceParts?: ServicePart[];
    inventoryTransactions?: InventoryTransaction[];
}
