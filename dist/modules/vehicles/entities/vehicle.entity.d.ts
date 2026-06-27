import { BaseEntity } from '../../../common/base/base.entity';
import { FuelType } from '../../../common/enums/fuel-type.enum';
import { Customer } from '../../customers/entities/customer.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { ServiceOrder } from '../../service-orders/entities/service-order.entity';
export declare class Vehicle extends BaseEntity {
    customerId: string;
    make: string;
    model: string;
    year: number;
    color?: string;
    plateNumber: string;
    vinNumber?: string;
    mileage?: number;
    fuelType?: FuelType;
    customer: Customer;
    appointments?: Appointment[];
    serviceOrders?: ServiceOrder[];
}
