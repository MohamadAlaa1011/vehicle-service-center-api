import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { ServicePart } from '../../service-orders/entities/service-part.entity';
import { InventoryTransaction } from '../../inventory-transactions/entities/inventory-transaction.entity';

@Entity('spare_parts')
export class SparePart extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  minimumStock: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  purchasePrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sellingPrice: number;

  @Column({ type: 'uuid' })
  supplierId: string;

  // Relations
  @ManyToOne(() => Supplier, (supplier) => supplier.spareParts)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @OneToMany(() => ServicePart, (servicePart) => servicePart.part)
  serviceParts?: ServicePart[];

  @OneToMany(() => InventoryTransaction, (transaction) => transaction.part)
  inventoryTransactions?: InventoryTransaction[];
}