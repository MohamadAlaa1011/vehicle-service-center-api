import { Repository } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { SparePart } from '../spare-parts/entities/spare-part.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';
export declare class DashboardService {
    private customerRepository;
    private vehicleRepository;
    private serviceOrderRepository;
    private appointmentRepository;
    private sparePartRepository;
    private invoiceRepository;
    private readonly logger;
    constructor(customerRepository: Repository<Customer>, vehicleRepository: Repository<Vehicle>, serviceOrderRepository: Repository<ServiceOrder>, appointmentRepository: Repository<Appointment>, sparePartRepository: Repository<SparePart>, invoiceRepository: Repository<Invoice>);
    getDashboardStats(): Promise<DashboardStatsDto>;
    getRecentServiceOrders(limit?: number): Promise<ServiceOrder[]>;
    getSystemAlerts(): Promise<{
        lowStockParts: SparePart[];
        overdueOrders: ServiceOrder[];
        upcomingAppointments: Appointment[];
    }>;
    private getTotalCustomers;
    private getTotalVehicles;
    private getActiveServiceOrders;
    private getMonthlyRevenue;
    private getInventoryValue;
    private getLowStockCount;
    private getPendingAppointments;
    private getOverdueServiceOrders;
    private getLowStockParts;
    private getOverdueOrders;
    private getUpcomingAppointments;
}
