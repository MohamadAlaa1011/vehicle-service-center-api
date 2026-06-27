import { BaseEntity } from '../../../common/base/base.entity';
import { ServiceOrderStatus } from '../../../common/enums/service-order-status.enum';
import { ServiceOrderPriority } from '../../../common/enums/service-order-priority.enum';
import { Customer } from '../../customers/entities/customer.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Mechanic } from '../../mechanics/entities/mechanic.entity';
import { ServicePart } from './service-part.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
export declare class ServiceOrder extends BaseEntity {
    orderNumber: string;
    customerId: string;
    vehicleId: string;
    assignedMechanicId?: string;
    issueDescription: string;
    diagnosis?: string;
    laborCost: number;
    status: ServiceOrderStatus;
    priority: ServiceOrderPriority;
    startDate?: Date;
    completionDate?: Date;
    customer: Customer;
    vehicle: Vehicle;
    assignedMechanic?: Mechanic;
    serviceParts?: ServicePart[];
    invoice?: Invoice;
}
