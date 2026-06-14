import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { ServiceOrder } from '../../service-orders/entities/service-order.entity';

@Entity('customers')
export class Customer extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  // Relations
  @OneToMany(() => Vehicle, (vehicle) => vehicle.customer)
  vehicles?: Vehicle[];

  @OneToMany(() => Appointment, (appointment) => appointment.customer)
  appointments?: Appointment[];

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.customer)
  serviceOrders?: ServiceOrder[];
}