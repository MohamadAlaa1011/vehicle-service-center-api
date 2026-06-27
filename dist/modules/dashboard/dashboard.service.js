"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DashboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../customers/entities/customer.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
const service_order_entity_1 = require("../service-orders/entities/service-order.entity");
const appointment_entity_1 = require("../appointments/entities/appointment.entity");
const spare_part_entity_1 = require("../spare-parts/entities/spare-part.entity");
const invoice_entity_1 = require("../invoices/entities/invoice.entity");
const service_order_status_enum_1 = require("../../common/enums/service-order-status.enum");
const appointment_status_enum_1 = require("../../common/enums/appointment-status.enum");
const invoice_status_enum_1 = require("../../common/enums/invoice-status.enum");
let DashboardService = DashboardService_1 = class DashboardService {
    customerRepository;
    vehicleRepository;
    serviceOrderRepository;
    appointmentRepository;
    sparePartRepository;
    invoiceRepository;
    logger = new common_1.Logger(DashboardService_1.name);
    constructor(customerRepository, vehicleRepository, serviceOrderRepository, appointmentRepository, sparePartRepository, invoiceRepository) {
        this.customerRepository = customerRepository;
        this.vehicleRepository = vehicleRepository;
        this.serviceOrderRepository = serviceOrderRepository;
        this.appointmentRepository = appointmentRepository;
        this.sparePartRepository = sparePartRepository;
        this.invoiceRepository = invoiceRepository;
    }
    async getDashboardStats() {
        try {
            const [totalCustomers, totalVehicles, activeServiceOrders, monthlyRevenue, inventoryValue, lowStockAlerts, pendingAppointments, overdueServiceOrders,] = await Promise.all([
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
        }
        catch (error) {
            this.logger.error('Error fetching dashboard stats', error);
            throw error;
        }
    }
    async getRecentServiceOrders(limit = 10) {
        return this.serviceOrderRepository.find({
            relations: ['customer', 'vehicle', 'assignedMechanic'],
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async getSystemAlerts() {
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
    async getTotalCustomers() {
        return this.customerRepository.count();
    }
    async getTotalVehicles() {
        return this.vehicleRepository.count();
    }
    async getActiveServiceOrders() {
        return this.serviceOrderRepository.count({
            where: [
                { status: service_order_status_enum_1.ServiceOrderStatus.PENDING },
                { status: service_order_status_enum_1.ServiceOrderStatus.DIAGNOSING },
                { status: service_order_status_enum_1.ServiceOrderStatus.WAITING_PARTS },
                { status: service_order_status_enum_1.ServiceOrderStatus.IN_PROGRESS },
            ],
        });
    }
    async getMonthlyRevenue() {
        try {
            const currentMonth = new Date();
            const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
            const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0, 23, 59, 59, 999);
            const result = await this.invoiceRepository
                .createQueryBuilder('invoice')
                .select('COALESCE(SUM(CAST(invoice.totalAmount AS DECIMAL)), 0)', 'total')
                .where('invoice.status = :status', { status: invoice_status_enum_1.InvoiceStatus.PAID })
                .andWhere('invoice.createdAt >= :startOfMonth', { startOfMonth: startOfMonth.toISOString() })
                .andWhere('invoice.createdAt <= :endOfMonth', { endOfMonth: endOfMonth.toISOString() })
                .getRawOne();
            return parseFloat(result.total) || 0;
        }
        catch (error) {
            this.logger.error('Error calculating monthly revenue', error);
            return 0;
        }
    }
    async getInventoryValue() {
        try {
            const result = await this.sparePartRepository
                .createQueryBuilder('sparePart')
                .select('COALESCE(SUM(sparePart.quantity * CAST(sparePart.sellingPrice AS DECIMAL)), 0)', 'total')
                .getRawOne();
            return parseFloat(result.total) || 0;
        }
        catch (error) {
            this.logger.error('Error calculating inventory value', error);
            return 0;
        }
    }
    async getLowStockCount() {
        return this.sparePartRepository
            .createQueryBuilder('sparePart')
            .where('sparePart.quantity <= sparePart.minimumStock')
            .getCount();
    }
    async getPendingAppointments() {
        try {
            const today = new Date();
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
            return await this.appointmentRepository.count({
                where: {
                    status: appointment_status_enum_1.AppointmentStatus.SCHEDULED,
                    appointmentDate: (0, typeorm_2.Between)(startOfDay, endOfDay),
                },
            });
        }
        catch (error) {
            this.logger.error('Error counting pending appointments', error);
            return 0;
        }
    }
    async getOverdueServiceOrders() {
        try {
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            return await this.serviceOrderRepository.count({
                where: {
                    status: service_order_status_enum_1.ServiceOrderStatus.IN_PROGRESS,
                    createdAt: (0, typeorm_2.LessThan)(threeDaysAgo),
                },
            });
        }
        catch (error) {
            this.logger.error('Error counting overdue service orders', error);
            return 0;
        }
    }
    async getLowStockParts() {
        return this.sparePartRepository
            .createQueryBuilder('sparePart')
            .leftJoinAndSelect('sparePart.supplier', 'supplier')
            .where('sparePart.quantity <= sparePart.minimumStock')
            .orderBy('sparePart.quantity', 'ASC')
            .take(10)
            .getMany();
    }
    async getOverdueOrders() {
        try {
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            return await this.serviceOrderRepository
                .createQueryBuilder('serviceOrder')
                .leftJoinAndSelect('serviceOrder.customer', 'customer')
                .leftJoinAndSelect('serviceOrder.vehicle', 'vehicle')
                .where('serviceOrder.status IN (:...statuses)', {
                statuses: [service_order_status_enum_1.ServiceOrderStatus.IN_PROGRESS, service_order_status_enum_1.ServiceOrderStatus.WAITING_PARTS],
            })
                .andWhere('serviceOrder.createdAt < :threeDaysAgo', { threeDaysAgo: threeDaysAgo.toISOString() })
                .orderBy('serviceOrder.createdAt', 'ASC')
                .take(10)
                .getMany();
        }
        catch (error) {
            this.logger.error('Error fetching overdue orders', error);
            return [];
        }
    }
    async getUpcomingAppointments() {
        try {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const startOfTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
            const endOfTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 23, 59, 59, 999);
            return await this.appointmentRepository.find({
                where: {
                    appointmentDate: (0, typeorm_2.Between)(startOfTomorrow, endOfTomorrow),
                    status: appointment_status_enum_1.AppointmentStatus.SCHEDULED,
                },
                relations: ['customer', 'vehicle'],
                order: { appointmentTime: 'ASC' },
                take: 10,
            });
        }
        catch (error) {
            this.logger.error('Error fetching upcoming appointments', error);
            return [];
        }
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = DashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(2, (0, typeorm_1.InjectRepository)(service_order_entity_1.ServiceOrder)),
    __param(3, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(4, (0, typeorm_1.InjectRepository)(spare_part_entity_1.SparePart)),
    __param(5, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map