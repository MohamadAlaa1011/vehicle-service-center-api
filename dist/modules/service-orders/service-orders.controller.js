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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_orders_service_1 = require("./service-orders.service");
const service_order_entity_1 = require("./entities/service-order.entity");
const dto_1 = require("./dto");
const pagination_response_dto_1 = require("../../common/dto/pagination-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
let ServiceOrdersController = class ServiceOrdersController {
    serviceOrdersService;
    constructor(serviceOrdersService) {
        this.serviceOrdersService = serviceOrdersService;
    }
    create(createServiceOrderDto) {
        return this.serviceOrdersService.create(createServiceOrderDto);
    }
    findAll(query) {
        return this.serviceOrdersService.findAll(query);
    }
    findOne(id) {
        return this.serviceOrdersService.findOne(id);
    }
    update(id, updateServiceOrderDto) {
        return this.serviceOrdersService.update(id, updateServiceOrderDto);
    }
    remove(id) {
        return this.serviceOrdersService.remove(id);
    }
    addParts(id, addPartsDto) {
        return this.serviceOrdersService.addParts(id, addPartsDto);
    }
    getServiceHistory(vehicleId) {
        return this.serviceOrdersService.getServiceHistory(vehicleId);
    }
    getTotalCost(id) {
        return this.serviceOrdersService.getTotalCost(id);
    }
};
exports.ServiceOrdersController = ServiceOrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER, user_role_enum_1.UserRole.RECEPTIONIST),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new service order' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Service order created successfully',
        type: service_order_entity_1.ServiceOrder,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer, vehicle, or mechanic not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateServiceOrderDto]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER, user_role_enum_1.UserRole.MECHANIC, user_role_enum_1.UserRole.RECEPTIONIST),
    (0, swagger_1.ApiOperation)({ summary: 'Get all service orders with filtering and pagination' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Service orders retrieved successfully',
        type: (pagination_response_dto_1.PaginationResponseDto),
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryServiceOrderDto]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER, user_role_enum_1.UserRole.MECHANIC, user_role_enum_1.UserRole.RECEPTIONIST),
    (0, swagger_1.ApiOperation)({ summary: 'Get service order by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Service order ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Service order retrieved successfully',
        type: service_order_entity_1.ServiceOrder,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Service order not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER, user_role_enum_1.UserRole.MECHANIC),
    (0, swagger_1.ApiOperation)({ summary: 'Update service order' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Service order ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Service order updated successfully',
        type: service_order_entity_1.ServiceOrder,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Service order not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateServiceOrderDto]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Delete service order (soft delete)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Service order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service order deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot delete non-pending service order' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Service order not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/parts'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER, user_role_enum_1.UserRole.MECHANIC),
    (0, swagger_1.ApiOperation)({ summary: 'Add parts to service order' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Service order ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Parts added to service order successfully',
        type: service_order_entity_1.ServiceOrder,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Insufficient parts quantity or service order completed' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Service order or spare part not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.AddPartsDto]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "addParts", null);
__decorate([
    (0, common_1.Get)('vehicle/:vehicleId/history'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER, user_role_enum_1.UserRole.MECHANIC, user_role_enum_1.UserRole.RECEPTIONIST),
    (0, swagger_1.ApiOperation)({ summary: 'Get service history for a vehicle' }),
    (0, swagger_1.ApiParam)({ name: 'vehicleId', description: 'Vehicle ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Service history retrieved successfully',
        type: [service_order_entity_1.ServiceOrder],
    }),
    __param(0, (0, common_1.Param)('vehicleId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "getServiceHistory", null);
__decorate([
    (0, common_1.Get)(':id/cost'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER, user_role_enum_1.UserRole.MECHANIC, user_role_enum_1.UserRole.RECEPTIONIST),
    (0, swagger_1.ApiOperation)({ summary: 'Get total cost breakdown for service order' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Service order ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cost breakdown retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                laborCost: { type: 'number', example: 150.00 },
                partsCost: { type: 'number', example: 245.50 },
                totalCost: { type: 'number', example: 395.50 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Service order not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceOrdersController.prototype, "getTotalCost", null);
exports.ServiceOrdersController = ServiceOrdersController = __decorate([
    (0, swagger_1.ApiTags)('Service Orders'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('service-orders'),
    __metadata("design:paramtypes", [service_orders_service_1.ServiceOrdersService])
], ServiceOrdersController);
//# sourceMappingURL=service-orders.controller.js.map