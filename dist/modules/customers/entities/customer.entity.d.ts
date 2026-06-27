import { BaseEntity } from '../../../common/base/base.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { ServiceOrder } from '../../service-orders/entities/service-order.entity';
export declare class Customer extends BaseEntity {
    fullName: string;
    phone: string;
    email?: string;
    address?: string;
    notes?: string;
    vehicles?: Vehicle[];
    appointments?: Appointment[];
    serviceOrders?: ServiceOrder[];
}
