import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { SparePart } from '../spare-parts/entities/spare-part.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';
import { ServiceOrderStatus } from '../../common/enums/service-order-status.enum';
import { AppointmentStatus } from '../../common/enums/appointment-status.enum';
import { InvoiceStatus } from '../../common/enums/invoice-status.enum';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(ServiceOrder)
    private serviceOrderRepository: Repository<ServiceOrder>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(SparePart)
    private sparePartRepository: Repository<SparePart>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async getDashboardStats(): Promise<DashboardStatsDto> {
    try {
      const [
        totalCustomers,
        totalVehicles,
        activeServiceOrders,
        monthlyRevenue,
        inventoryValue,
        lowStockAlerts,
        pendingAppointments,
        overdueServiceOrders,
      ] = await Promise.all([
        this.getTotalCustomers(),
        this.getTotalVehicles(),
        this.getActiveServiceOrders(),
        this.getMonthlyRevenue(),
        this.getInventoryValue(),
        this.getLowStockCount(),
        this.getPendingAppointments(),
        this.getOverdueServiceOrders(),
      ]);

      return {
        totalCustomers,
        totalVehicles,
        activeServiceOrders,
        monthlyRevenue,
        inventoryValue,
        lowStockAlerts,
        pendingAppointments,
        overdueServiceOrders,
      };
    } catch (error) {
      this.logger.error('Error fetching dashboard stats', error);
      throw error;
    }
  }

  async getRecentServiceOrders(limit: number = 10): Promise<ServiceOrder[]> {
    return this.serviceOrderRepository.find({
      relations: ['customer', 'vehicle', 'assignedMechanic'],
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getSystemAlerts(): Promise<{
    lowStockParts: SparePart[];
    overdueOrders: ServiceOrder[];
    upcomingAppointments: Appointment[];
  }> {
    const [lowStockParts, overdueOrders, upcomingAppointments] = await Promise.all([
      this.getLowStockParts(),
      this.getOverdueOrders(),
      this.getUpcomingAppointments(),
    ]);

    return {
      lowStockParts,
      overdueOrders,
      upcomingAppointments,
    };
  }

  private async getTotalCustomers(): Promise<number> {
    return this.customerRepository.count();
  }

  private async getTotalVehicles(): Promise<number> {
    return this.vehicleRepository.count();
  }

  private async getActiveServiceOrders(): Promise<number> {
    return this.serviceOrderRepository.count({
      where: [
        { status: ServiceOrderStatus.PENDING },
        { status: ServiceOrderStatus.DIAGNOSING },
        { status: ServiceOrderStatus.WAITING_PARTS },
        { status: ServiceOrderStatus.IN_PROGRESS },
      ],
    });
  }

  private async getMonthlyRevenue(): Promise<number> {
    try {
      const currentMonth = new Date();
      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0, 23, 59, 59, 999);

      const result = await this.invoiceRepository
        .createQueryBuilder('invoice')
        .select('COALESCE(SUM(CAST(invoice.totalAmount AS DECIMAL)), 0)', 'total')
        .where('invoice.status = :status', { status: InvoiceStatus.PAID })
        .andWhere('invoice.createdAt >= :startOfMonth', { startOfMonth: startOfMonth.toISOString() })
        .andWhere('invoice.createdAt <= :endOfMonth', { endOfMonth: endOfMonth.toISOString() })
        .getRawOne();

      return parseFloat(result.total) || 0;
    } catch (error) {
      this.logger.error('Error calculating monthly revenue', error);
      return 0;
    }
  }

  private async getInventoryValue(): Promise<number> {
    try {
      const result = await this.sparePartRepository
        .createQueryBuilder('sparePart')
        .select('COALESCE(SUM(sparePart.quantity * CAST(sparePart.sellingPrice AS DECIMAL)), 0)', 'total')
        .getRawOne();

      return parseFloat(result.total) || 0;
    } catch (error) {
      this.logger.error('Error calculating inventory value', error);
      return 0;
    }
  }

  private async getLowStockCount(): Promise<number> {
    return this.sparePartRepository
      .createQueryBuilder('sparePart')
      .where('sparePart.quantity <= sparePart.minimumStock')
      .getCount();
  }

  private async getPendingAppointments(): Promise<number> {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

      return await this.appointmentRepository.count({
        where: {
          status: AppointmentStatus.SCHEDULED,
          appointmentDate: Between(startOfDay, endOfDay),
        },
      });
    } catch (error) {
      this.logger.error('Error counting pending appointments', error);
      return 0;
    }
  }

  private async getOverdueServiceOrders(): Promise<number> {
    try {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      return await this.serviceOrderRepository.count({
        where: {
          status: ServiceOrderStatus.IN_PROGRESS,
          createdAt: LessThan(threeDaysAgo),
        },
      });
    } catch (error) {
      this.logger.error('Error counting overdue service orders', error);
      return 0;
    }
  }

  private async getLowStockParts(): Promise<SparePart[]> {
    return this.sparePartRepository
      .createQueryBuilder('sparePart')
      .leftJoinAndSelect('sparePart.supplier', 'supplier')
      .where('sparePart.quantity <= sparePart.minimumStock')
      .orderBy('sparePart.quantity', 'ASC')
      .take(10)
      .getMany();
  }

  private async getOverdueOrders(): Promise<ServiceOrder[]> {
    try {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      return await this.serviceOrderRepository
        .createQueryBuilder('serviceOrder')
        .leftJoinAndSelect('serviceOrder.customer', 'customer')
        .leftJoinAndSelect('serviceOrder.vehicle', 'vehicle')
        .where('serviceOrder.status IN (:...statuses)', {
          statuses: [ServiceOrderStatus.IN_PROGRESS, ServiceOrderStatus.WAITING_PARTS],
        })
        .andWhere('serviceOrder.createdAt < :threeDaysAgo', { threeDaysAgo: threeDaysAgo.toISOString() })
        .orderBy('serviceOrder.createdAt', 'ASC')
        .take(10)
        .getMany();
    } catch (error) {
      this.logger.error('Error fetching overdue orders', error);
      return [];
    }
  }

  private async getUpcomingAppointments(): Promise<Appointment[]> {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const startOfTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
      const endOfTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 23, 59, 59, 999);

      return await this.appointmentRepository.find({
        where: {
          appointmentDate: Between(startOfTomorrow, endOfTomorrow),
          status: AppointmentStatus.SCHEDULED,
        },
        relations: ['customer', 'vehicle'],
        order: { appointmentTime: 'ASC' },
        take: 10,
      });
    } catch (error) {
      this.logger.error('Error fetching upcoming appointments', error);
      return [];
    }
  }
}