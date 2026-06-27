import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from './dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(queryDto: QueryUserDto): Promise<PaginationResponseDto<User>>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}
