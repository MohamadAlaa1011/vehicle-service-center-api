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
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, UpdateVehicleDto, QueryVehicleDto } from './dto';
import { Vehicle } from './entities/vehicle.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { JwtAuthGuard } from '../auth/guards';
import { RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../common/enums';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';

@ApiTags('Vehicles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @ApiOperation({ summary: 'Register a new vehicle' })
  @ApiResponse({
    status: 201,
    description: 'Vehicle registered successfully',
    type: Vehicle,
  })
  @ApiResponse({ status: 400, description: 'Customer not found' })
  @ApiResponse({ status: 409, description: 'Plate number or VIN already exists' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.RECEPTIONIST)
  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.create(createVehicleDto);
  }

  @ApiOperation({ summary: 'Get all vehicles with pagination and filtering' })
  @ApiResponse({
    status: 200,
    description: 'Vehicles retrieved successfully',
    type: PaginationResponseDto<Vehicle>,
  })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get()
  async findAll(@Query() queryDto: QueryVehicleDto): Promise<PaginationResponseDto<Vehicle>> {
    return this.vehiclesService.findAll(queryDto);
  }

  @ApiOperation({ summary: 'Get vehicle by ID with relationships' })
  @ApiParam({ name: 'id', description: 'Vehicle ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle retrieved successfully',
    type: Vehicle,
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update vehicle by ID' })
  @ApiParam({ name: 'id', description: 'Vehicle ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle updated successfully',
    type: Vehicle,
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  @ApiResponse({ status: 409, description: 'Plate number or VIN already exists' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.RECEPTIONIST)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @ApiOperation({ summary: 'Delete vehicle by ID (soft delete)' })
  @ApiParam({ name: 'id', description: 'Vehicle ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    await this.vehiclesService.remove(id);
    return { message: 'Vehicle deleted successfully' };
  }

  @ApiOperation({ summary: 'Get vehicle service history' })
  @ApiParam({ name: 'id', description: 'Vehicle ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle service history retrieved successfully',
    type: PaginationResponseDto<ServiceOrder>,
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get(':id/service-history')
  async getVehicleServiceHistory(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() queryDto: QueryVehicleDto,
  ): Promise<PaginationResponseDto<ServiceOrder>> {
    return this.vehiclesService.getVehicleServiceHistory(id, queryDto);
  }

  @ApiOperation({ summary: 'Update vehicle mileage' })
  @ApiParam({ name: 'id', description: 'Vehicle ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle mileage updated successfully',
    type: Vehicle,
  })
  @ApiResponse({ status: 400, description: 'Invalid mileage value' })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Patch(':id/mileage')
  async updateMileage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { mileage: number },
  ): Promise<Vehicle> {
    return this.vehiclesService.updateMileage(id, body.mileage);
  }
}