import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { JwtAuthGuard } from '../auth/guards';
import { RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../common/enums';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({
    status: 200,
    description: 'Dashboard statistics retrieved successfully',
    type: DashboardStatsDto,
  })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get('stats')
  async getDashboardStats(): Promise<DashboardStatsDto> {
    return this.dashboardService.getDashboardStats();
  }

  @ApiOperation({ summary: 'Get recent service orders' })
  @ApiResponse({
    status: 200,
    description: 'Recent service orders retrieved successfully',
    type: [ServiceOrder],
  })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get('recent-orders')
  async getRecentServiceOrders(): Promise<ServiceOrder[]> {
    return this.dashboardService.getRecentServiceOrders();
  }

  @ApiOperation({ summary: 'Get system alerts and notifications' })
  @ApiResponse({
    status: 200,
    description: 'System alerts retrieved successfully',
  })
  @Roles(UserRole.SUPER_ADMIN, UserRole.SERVICE_MANAGER, UserRole.MECHANIC, UserRole.RECEPTIONIST)
  @Get('alerts')
  async getSystemAlerts(): Promise<{
    lowStockParts: any[];
    overdueOrders: ServiceOrder[];
    upcomingAppointments: any[];
  }> {
    return this.dashboardService.getSystemAlerts();
  }
}