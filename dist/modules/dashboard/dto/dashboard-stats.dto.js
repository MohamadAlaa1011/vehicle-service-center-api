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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardStatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DashboardStatsDto {
    totalCustomers;
    totalVehicles;
    activeServiceOrders;
    monthlyRevenue;
    inventoryValue;
    lowStockAlerts;
    pendingAppointments;
    overdueServiceOrders;
}
exports.DashboardStatsDto = DashboardStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of customers',
        example: 150,
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "totalCustomers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of vehicles registered',
        example: 220,
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "totalVehicles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of active service orders',
        example: 25,
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "activeServiceOrders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Monthly revenue in dollars',
        example: 45000.50,
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "monthlyRevenue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total inventory value in dollars',
        example: 125000.75,
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "inventoryValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of parts with low stock',
        example: 8,
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "lowStockAlerts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of pending appointments',
        example: 12,
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "pendingAppointments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of overdue service orders',
        example: 3,
    }),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "overdueServiceOrders", void 0);
//# sourceMappingURL=dashboard-stats.dto.js.map