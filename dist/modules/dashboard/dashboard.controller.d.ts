import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardStats(): Promise<DashboardStatsDto>;
    getRecentServiceOrders(): Promise<ServiceOrder[]>;
    getSystemAlerts(): Promise<{
        lowStockParts: any[];
        overdueOrders: ServiceOrder[];
        upcomingAppointments: any[];
    }>;
}
