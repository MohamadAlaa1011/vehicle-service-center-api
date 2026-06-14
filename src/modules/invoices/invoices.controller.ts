import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
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
import { InvoicesService } from './invoices.service';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';

@ApiTags('Invoices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Create invoice for completed service order' })
  @ApiResponse({
    status: 201,
    description: 'Invoice created successfully',
    type: Invoice,
  })
  @ApiResponse({ status: 400, description: 'Service order not completed or invoice already exists' })
  @ApiResponse({ status: 404, description: 'Service order not found' })
  create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Get invoice by ID' })
  @ApiParam({ name: 'id', description: 'Invoice ID' })
  @ApiResponse({
    status: 200,
    description: 'Invoice retrieved successfully',
    type: Invoice,
  })
  @ApiResponse({ status: 404, description: 'Invoice not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Invoice> {
    return this.invoicesService.findOne(id);
  }

  @Patch(':id/mark-paid')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Mark invoice as paid' })
  @ApiParam({ name: 'id', description: 'Invoice ID' })
  @ApiResponse({
    status: 200,
    description: 'Invoice marked as paid successfully',
    type: Invoice,
  })
  @ApiResponse({ status: 400, description: 'Invoice already paid' })
  @ApiResponse({ status: 404, description: 'Invoice not found' })
  markAsPaid(@Param('id', ParseUUIDPipe) id: string): Promise<Invoice> {
    return this.invoicesService.markAsPaid(id);
  }
}