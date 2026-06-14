import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { AppointmentStatus } from '../../../common/enums/appointment-status.enum';
import { Customer } from '../../customers/entities/customer.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity('appointments')
export class Appointment extends BaseEntity {
  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'uuid' })
  vehicleId: string;

  @Column({ type: 'date' })
  appointmentDate: Date;

  @Column({ type: 'time' })
  appointmentTime: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  status: AppointmentStatus;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  // Relations
  @ManyToOne(() => Customer, (customer) => customer.appointments)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.appointments)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;
}