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
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ServiceOrdersService } from './service-orders.service';
import { ServiceOrder } from './entities/service-order.entity';
import { CreateServiceOrderDto, UpdateServiceOrderDto, QueryServiceOrderDto, AddPartsDto } from './dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';

@ApiTags('Service Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('service-orders')
export class ServiceOrdersController {
  constructor(private readonly serviceOrdersService: ServiceOrdersService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Create a new service order' })
  @ApiResponse({
    status: 201,
    description: 'Service order created successfully',
    type: ServiceOrder,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Customer, vehicle, or mechanic not found' })
  create(@Body() createServiceOrderDto: CreateServiceOrderDto): Promise<ServiceOrder> {
    return this.serviceOrdersService.create(createServiceOrderDto);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Get all service orders with filtering and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Service orders retrieved successfully',
    type: PaginationResponseDto<ServiceOrder>,
  })
  findAll(@Query() query: QueryServiceOrderDto): Promise<PaginationResponseDto<ServiceOrder>> {
    return this.serviceOrdersService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Get service order by ID' })
  @ApiParam({ name: 'id', description: 'Service order ID' })
  @ApiResponse({
    status: 200,
    description: 'Service order retrieved successfully',
    type: ServiceOrder,
  })
  @ApiResponse({ status: 404, description: 'Service order not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ServiceOrder> {
    return this.serviceOrdersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC)
  @ApiOperation({ summary: 'Update service order' })
  @ApiParam({ name: 'id', description: 'Service order ID' })
  @ApiResponse({
    status: 200,
    description: 'Service order updated successfully',
    type: ServiceOrder,
  })
  @ApiResponse({ status: 404, description: 'Service order not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServiceOrderDto: UpdateServiceOrderDto,
  ): Promise<ServiceOrder> {
    return this.serviceOrdersService.update(id, updateServiceOrderDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER)
  @ApiOperation({ summary: 'Delete service order (soft delete)' })
  @ApiParam({ name: 'id', description: 'Service order ID' })
  @ApiResponse({ status: 200, description: 'Service order deleted successfully' })
  @ApiResponse({ status: 400, description: 'Cannot delete non-pending service order' })
  @ApiResponse({ status: 404, description: 'Service order not found' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.serviceOrdersService.remove(id);
  }

  @Post(':id/parts')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC)
  @ApiOperation({ summary: 'Add parts to service order' })
  @ApiParam({ name: 'id', description: 'Service order ID' })
  @ApiResponse({
    status: 200,
    description: 'Parts added to service order successfully',
    type: ServiceOrder,
  })
  @ApiResponse({ status: 400, description: 'Insufficient parts quantity or service order completed' })
  @ApiResponse({ status: 404, description: 'Service order or spare part not found' })
  addParts(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() addPartsDto: AddPartsDto,
  ): Promise<ServiceOrder> {
    return this.serviceOrdersService.addParts(id, addPartsDto);
  }

  @Get('vehicle/:vehicleId/history')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Get service history for a vehicle' })
  @ApiParam({ name: 'vehicleId', description: 'Vehicle ID' })
  @ApiResponse({
    status: 200,
    description: 'Service history retrieved successfully',
    type: [ServiceOrder],
  })
  getServiceHistory(@Param('vehicleId', ParseUUIDPipe) vehicleId: string): Promise<ServiceOrder[]> {
    return this.serviceOrdersService.getServiceHistory(vehicleId);
  }

  @Get(':id/cost')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Get total cost breakdown for service order' })
  @ApiParam({ name: 'id', description: 'Service order ID' })
  @ApiResponse({
    status: 200,
    description: 'Cost breakdown retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        laborCost: { type: 'number', example: 150.00 },
        partsCost: { type: 'number', example: 245.50 },
        totalCost: { type: 'number', example: 395.50 },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Service order not found' })
  getTotalCost(@Param('id', ParseUUIDPipe) id: string): Promise<{ laborCost: number; partsCost: number; totalCost: number }> {
    return this.serviceOrdersService.getTotalCost(id);
  }
}