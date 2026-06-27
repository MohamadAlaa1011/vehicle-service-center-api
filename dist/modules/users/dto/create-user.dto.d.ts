import { UserRole } from '../../../common/enums/user-role.enum';
import { UserStatus } from '../../../common/enums/user-status.enum';
export declare class CreateUserDto {
    fullName: string;
    email: string;
    phone?: string;
    password: string;
    role: UserRole;
    status?: UserStatus;
}
