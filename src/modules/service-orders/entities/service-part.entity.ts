import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { ServiceOrder } from './service-order.entity';
import { SparePart } from '../../spare-parts/entities/spare-part.entity';

@Entity('service_parts')
export class ServicePart extends BaseEntity {
  @Column({ type: 'uuid' })
  serviceOrderId: string;

  @Column({ type: 'uuid' })
  partId: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  // Relations
  @ManyToOne(() => ServiceOrder, (serviceOrder) => serviceOrder.serviceParts)
  @JoinColumn({ name: 'serviceOrderId' })
  serviceOrder: ServiceOrder;

  @ManyToOne(() => SparePart, (sparePart) => sparePart.serviceParts)
  @JoinColumn({ name: 'partId' })
  part: SparePart;
}