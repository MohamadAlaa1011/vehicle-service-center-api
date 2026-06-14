import { Entity, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { ServiceOrderStatus } from '../../../common/enums/service-order-status.enum';
import { ServiceOrderPriority } from '../../../common/enums/service-order-priority.enum';
import { Customer } from '../../customers/entities/customer.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Mechanic } from '../../mechanics/entities/mechanic.entity';
import { ServicePart } from './service-part.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';

@Entity('service_orders')
export class ServiceOrder extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  orderNumber: string;

  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'uuid' })
  vehicleId: string;

  @Column({ type: 'uuid', nullable: true })
  assignedMechanicId?: string;

  @Column({ type: 'text' })
  issueDescription: string;

  @Column({ type: 'text', nullable: true })
  diagnosis?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  laborCost: number;

  @Column({
    type: 'enum',
    enum: ServiceOrderStatus,
    default: ServiceOrderStatus.PENDING,
  })
  status: ServiceOrderStatus;

  @Column({
    type: 'enum',
    enum: ServiceOrderPriority,
    default: ServiceOrderPriority.MEDIUM,
  })
  priority: ServiceOrderPriority;

  @Column({ type: 'timestamp', nullable: true })
  startDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  completionDate?: Date;

  // Relations
  @ManyToOne(() => Customer, (customer) => customer.serviceOrders)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.serviceOrders)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @ManyToOne(() => Mechanic, (mechanic) => mechanic.assignedServiceOrders)
  @JoinColumn({ name: 'assignedMechanicId' })
  assignedMechanic?: Mechanic;

  @OneToMany(() => ServicePart, (servicePart) => servicePart.serviceOrder)
  serviceParts?: ServicePart[];

  @OneToOne(() => Invoice, (invoice) => invoice.serviceOrder)
  invoice?: Invoice;
}