import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { InvoiceStatus } from '../../../common/enums/invoice-status.enum';
import { ServiceOrder } from '../../service-orders/entities/service-order.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('invoices')
export class Invoice extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  invoiceNumber: string;

  @Column({ type: 'uuid' })
  serviceOrderId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  laborAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  partsAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.UNPAID,
  })
  status: InvoiceStatus;

  // Relations
  @OneToOne(() => ServiceOrder, (serviceOrder) => serviceOrder.invoice)
  @JoinColumn({ name: 'serviceOrderId' })
  serviceOrder: ServiceOrder;

  @OneToMany(() => Payment, (payment) => payment.invoice)
  payments?: Payment[];
}