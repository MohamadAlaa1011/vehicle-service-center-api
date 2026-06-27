import { BaseEntity } from '../../../common/base/base.entity';
import { AppointmentStatus } from '../../../common/enums/appointment-status.enum';
import { Customer } from '../../customers/entities/customer.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
export declare class Appointment extends BaseEntity {
    customerId: string;
    vehicleId: string;
    appointmentDate: Date;
    appointmentTime: string;
    status: AppointmentStatus;
    notes?: string;
    customer: Customer;
    vehicle: Vehicle;
}
