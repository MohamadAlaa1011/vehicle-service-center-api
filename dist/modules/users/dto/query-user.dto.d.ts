import { PaginationDto } from '../../../common/dto/pagination.dto';
import { UserRole } from '../../../common/enums/user-role.enum';
import { UserStatus } from '../../../common/enums/user-status.enum';
export declare class QueryUserDto extends PaginationDto {
    role?: UserRole;
    status?: UserStatus;
}
