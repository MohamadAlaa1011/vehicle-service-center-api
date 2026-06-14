import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto, QueryCustomerDto } from './dto';
import { Customer } from './entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { JwtAuthGuard } from '../auth/guards';
import { RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../common/enums';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';

@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({
    status: 201,
    description: 'Customer created successfully',
    type: Customer,
  })
  @ApiResponse({ status: 409, description: 'Customer with email already exists' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.RECEPTIONIST)
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(createCustomerDto);
  }

  @ApiOperation({ summary: 'Get all customers with pagination and filtering' })
  @ApiResponse({
    status: 200,
    description: 'Customers retrieved successfully',
    type: PaginationResponseDto<Customer>,
  })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get()
  async findAll(@Query() queryDto: QueryCustomerDto): Promise<PaginationResponseDto<Customer>> {
    return this.customersService.findAll(queryDto);
  }

  @ApiOperation({ summary: 'Get customer by ID with relationships' })
  @ApiParam({ name: 'id', description: 'Customer ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Customer retrieved successfully',
    type: Customer,
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Customer> {
    return this.customersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Customer updated successfully',
    type: Customer,
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.RECEPTIONIST)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(id, updateCustomerDto);
  }

  @ApiOperation({ summary: 'Delete customer by ID (soft delete)' })
  @ApiParam({ name: 'id', description: 'Customer ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Customer deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    await this.customersService.remove(id);
    return { message: 'Customer deleted successfully' };
  }

  @ApiOperation({ summary: 'Get all vehicles owned by customer' })
  @ApiParam({ name: 'id', description: 'Customer ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Customer vehicles retrieved successfully',
    type: PaginationResponseDto<Vehicle>,
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get(':id/vehicles')
  async getCustomerVehicles(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() queryDto: QueryCustomerDto,
  ): Promise<PaginationResponseDto<Vehicle>> {
    return this.customersService.getCustomerVehicles(id, queryDto);
  }

  @ApiOperation({ summary: 'Get customer service history' })
  @ApiParam({ name: 'id', description: 'Customer ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Customer service history retrieved successfully',
    type: PaginationResponseDto<ServiceOrder>,
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get(':id/service-history')
  async getCustomerServiceHistory(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() queryDto: QueryCustomerDto,
  ): Promise<PaginationResponseDto<ServiceOrder>> {
    return this.customersService.getCustomerServiceHistory(id, queryDto);
  }
}