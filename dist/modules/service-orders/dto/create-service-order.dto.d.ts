import { ServiceOrderPriority } from '../../../common/enums/service-order-priority.enum';
export declare class CreateServiceOrderDto {
    customerId: string;
    vehicleId: string;
    assignedMechanicId?: string;
    issueDescription: string;
    laborCost?: number;
    priority?: ServiceOrderPriority;
    startDate?: string;
}
