import { ApiProperty } from '@nestjs/swagger';

export class DashboardStatsDto {
  @ApiProperty({
    description: 'Total number of customers',
    example: 150,
  })
  totalCustomers: number;

  @ApiProperty({
    description: 'Total number of vehicles registered',
    example: 220,
  })
  totalVehicles: number;

  @ApiProperty({
    description: 'Number of active service orders',
    example: 25,
  })
  activeServiceOrders: number;

  @ApiProperty({
    description: 'Monthly revenue in dollars',
    example: 45000.50,
  })
  monthlyRevenue: number;

  @ApiProperty({
    description: 'Total inventory value in dollars',
    example: 125000.75,
  })
  inventoryValue: number;

  @ApiProperty({
    description: 'Number of parts with low stock',
    example: 8,
  })
  lowStockAlerts: number;

  @ApiProperty({
    description: 'Number of pending appointments',
    example: 12,
  })
  pendingAppointments: number;

  @ApiProperty({
    description: 'Number of overdue service orders',
    example: 3,
  })
  overdueServiceOrders: number;
}