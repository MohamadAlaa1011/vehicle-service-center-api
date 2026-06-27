import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from './dto';
import { User } from './entities/user.entity';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(queryDto: QueryUserDto): Promise<PaginationResponseDto<User>>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
