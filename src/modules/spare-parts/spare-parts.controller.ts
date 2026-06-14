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
import { SparePartsService } from './spare-parts.service';
import { CreateSparePartDto, UpdateSparePartDto, QuerySparePartDto, AdjustStockDto } from './dto';
import { SparePart } from './entities/spare-part.entity';
import { JwtAuthGuard } from '../auth/guards';
import { RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../common/enums';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';

@ApiTags('Spare Parts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('spare-parts')
export class SparePartsController {
  constructor(private readonly sparePartsService: SparePartsService) {}

  @ApiOperation({ summary: 'Create a new spare part' })
  @ApiResponse({
    status: 201,
    description: 'Spare part created successfully',
    type: SparePart,
  })
  @ApiResponse({ status: 400, description: 'Supplier not found or validation error' })
  @ApiResponse({ status: 409, description: 'SKU already exists' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER)
  @Post()
  async create(@Body() createSparePartDto: CreateSparePartDto): Promise<SparePart> {
    return this.sparePartsService.create(createSparePartDto);
  }

  @ApiOperation({ summary: 'Get all spare parts with pagination and filtering' })
  @ApiResponse({
    status: 200,
    description: 'Spare parts retrieved successfully',
    type: PaginationResponseDto<SparePart>,
  })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get()
  async findAll(@Query() queryDto: QuerySparePartDto): Promise<PaginationResponseDto<SparePart>> {
    return this.sparePartsService.findAll(queryDto);
  }

  @ApiOperation({ summary: 'Get low stock alerts' })
  @ApiResponse({
    status: 200,
    description: 'Low stock parts retrieved successfully',
    type: [SparePart],
  })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get('low-stock')
  async getLowStockAlerts(): Promise<SparePart[]> {
    return this.sparePartsService.getLowStockAlerts();
  }

  @ApiOperation({ summary: 'Get parts grouped by category with statistics' })
  @ApiResponse({
    status: 200,
    description: 'Parts by category retrieved successfully',
  })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER)
  @Get('by-category')
  async getPartsByCategory(): Promise<{ category: string; count: number; totalValue: number }[]> {
    return this.sparePartsService.getPartsByCategory();
  }

  @ApiOperation({ summary: 'Get spare part by ID' })
  @ApiParam({ name: 'id', description: 'Spare part ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Spare part retrieved successfully',
    type: SparePart,
  })
  @ApiResponse({ status: 404, description: 'Spare part not found' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<SparePart> {
    return this.sparePartsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update spare part by ID' })
  @ApiParam({ name: 'id', description: 'Spare part ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Spare part updated successfully',
    type: SparePart,
  })
  @ApiResponse({ status: 404, description: 'Spare part not found' })
  @ApiResponse({ status: 409, description: 'SKU already exists' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSparePartDto: UpdateSparePartDto,
  ): Promise<SparePart> {
    return this.sparePartsService.update(id, updateSparePartDto);
  }

  @ApiOperation({ summary: 'Delete spare part by ID (soft delete)' })
  @ApiParam({ name: 'id', description: 'Spare part ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Spare part deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Spare part not found' })
  @Roles(UserRole.SUPER_ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    await this.sparePartsService.remove(id);
    return { message: 'Spare part deleted successfully' };
  }

  @ApiOperation({ summary: 'Adjust spare part inventory' })
  @ApiParam({ name: 'id', description: 'Spare part ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Inventory adjusted successfully',
    type: SparePart,
  })
  @ApiResponse({ status: 400, description: 'Insufficient stock' })
  @ApiResponse({ status: 404, description: 'Spare part not found' })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER)
  @Post(':id/adjust-stock')
  async adjustStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() adjustStockDto: AdjustStockDto,
  ): Promise<SparePart> {
    return this.sparePartsService.adjustStock(id, adjustStockDto);
  }
}