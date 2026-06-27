import { BaseEntity } from '../../../common/base/base.entity';
import { UserStatus } from '../../../common/enums/user-status.enum';
import { User } from '../../users/entities/user.entity';
import { ServiceOrder } from '../../service-orders/entities/service-order.entity';
export declare class Mechanic extends BaseEntity {
    userId: string;
    specialization?: string;
    hireDate: Date;
    salary?: number;
    status: UserStatus;
    user: User;
    assignedServiceOrders?: ServiceOrder[];
}
