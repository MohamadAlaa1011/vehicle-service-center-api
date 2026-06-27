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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_stats_dto_1 = require("./dto/dashboard-stats.dto");
const service_order_entity_1 = require("../service-orders/entities/service-order.entity");
const guards_1 = require("../auth/guards");
const guards_2 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const enums_1 = require("../../common/enums");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getDashboardStats() {
        return this.dashboardService.getDashboardStats();
    }
    async getRecentServiceOrders() {
        return this.dashboardService.getRecentServiceOrders();
    }
    async getSystemAlerts() {
        return this.dashboardService.getSystemAlerts();
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get dashboard statistics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dashboard statistics retrieved successfully',
        type: dashboard_stats_dto_1.DashboardStatsDto,
    }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardStats", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get recent service orders' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Recent service orders retrieved successfully',
        type: [service_order_entity_1.ServiceOrder],
    }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)('recent-orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getRecentServiceOrders", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get system alerts and notifications' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'System alerts retrieved successfully',
    }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)('alerts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getSystemAlerts", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_2.RolesGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map