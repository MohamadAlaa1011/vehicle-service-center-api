import { BaseEntity } from '../../../common/base/base.entity';
import { UserRole } from '../../../common/enums/user-role.enum';
import { UserStatus } from '../../../common/enums/user-status.enum';
import { Mechanic } from '../../mechanics/entities/mechanic.entity';
export declare class User extends BaseEntity {
    fullName: string;
    email: string;
    phone?: string;
    passwordHash: string;
    role: UserRole;
    status: UserStatus;
    refreshToken?: string;
    resetToken?: string;
    resetTokenExpiresAt?: Date;
    mechanic?: Mechanic;
}
