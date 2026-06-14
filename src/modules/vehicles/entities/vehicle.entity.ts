import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { FuelType } from '../../../common/enums/fuel-type.enum';
import { Customer } from '../../customers/entities/customer.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { ServiceOrder } from '../../service-orders/entities/service-order.entity';

@Entity('vehicles')
export class Vehicle extends BaseEntity {
  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'varchar', length: 100 })
  make: string;

  @Column({ type: 'varchar', length: 100 })
  model: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  color?: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  plateNumber: string;

  @Column({ type: 'varchar', length: 17, unique: true, nullable: true })
  vinNumber?: string;

  @Column({ type: 'int', nullable: true })
  mileage?: number;

  @Column({
    type: 'enum',
    enum: FuelType,
    nullable: true,
  })
  fuelType?: FuelType;

  // Relations
  @ManyToOne(() => Customer, (customer) => customer.vehicles)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => Appointment, (appointment) => appointment.vehicle)
  appointments?: Appointment[];

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.vehicle)
  serviceOrders?: ServiceOrder[];
}