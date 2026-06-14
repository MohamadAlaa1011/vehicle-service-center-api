import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { PaymentMethod } from '../../../common/enums/payment-method.enum';
import { Invoice } from '../../invoices/entities/invoice.entity';

@Entity('payments')
export class Payment extends BaseEntity {
  @Column({ type: 'uuid' })
  invoiceId: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  transactionReference?: string;

  // Relations
  @ManyToOne(() => Invoice, (invoice) => invoice.payments)
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;
}