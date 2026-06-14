import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from './dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, ...userData } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      ...userData,
      email,
      passwordHash,
    });

    return this.userRepository.save(user);
  }

  async findAll(queryDto: QueryUserDto): Promise<PaginationResponseDto<User>> {
    const {
      page = 1,
      limit = 20,
      search,
      role,
      status,
      sortBy = 'createdAt',
      order = 'DESC',
    } = queryDto;

    const queryOptions: FindManyOptions<User> = {
      relations: ['mechanic'],
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: order },
    };

    // Build where conditions
    const whereConditions: any = {};

    if (search) {
      whereConditions.fullName = Like(`%${search}%`);
    }

    if (role) {
      whereConditions.role = role;
    }

    if (status) {
      whereConditions.status = status;
    }

    queryOptions.where = whereConditions;

    const [users, total] = await this.userRepository.findAndCount(queryOptions);

    return new PaginationResponseDto(users, page, limit, total);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['mechanic'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    const { password, ...updateData } = updateUserDto;

    // If password is being updated, hash it
    if (password) {
      const saltRounds = 12;
      updateData['passwordHash'] = await bcrypt.hash(password, saltRounds);
    }

    // Check for email conflicts if email is being updated
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateData.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    await this.userRepository.update(id, updateData);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.softDelete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['mechanic'],
    });
  }
}