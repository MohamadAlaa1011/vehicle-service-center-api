import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { TransactionType } from '../../../common/enums/transaction-type.enum';
import { SparePart } from '../../spare-parts/entities/spare-part.entity';

@Entity('inventory_transactions')
export class InventoryTransaction extends BaseEntity {
  @Column({ type: 'uuid' })
  partId: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reason?: string;

  @Column({ type: 'uuid', nullable: true })
  referenceId?: string; // References service_orders for sales

  // Relations
  @ManyToOne(() => SparePart, (sparePart) => sparePart.inventoryTransactions)
  @JoinColumn({ name: 'partId' })
  part: SparePart;
}