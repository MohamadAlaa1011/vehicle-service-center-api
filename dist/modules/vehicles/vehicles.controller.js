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
exports.VehiclesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vehicles_service_1 = require("./vehicles.service");
const dto_1 = require("./dto");
const vehicle_entity_1 = require("./entities/vehicle.entity");
const guards_1 = require("../auth/guards");
const guards_2 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const enums_1 = require("../../common/enums");
const pagination_response_dto_1 = require("../../common/dto/pagination-response.dto");
let VehiclesController = class VehiclesController {
    vehiclesService;
    constructor(vehiclesService) {
        this.vehiclesService = vehiclesService;
    }
    async create(createVehicleDto) {
        return this.vehiclesService.create(createVehicleDto);
    }
    async findAll(queryDto) {
        return this.vehiclesService.findAll(queryDto);
    }
    async findOne(id) {
        return this.vehiclesService.findOne(id);
    }
    async update(id, updateVehicleDto) {
        return this.vehiclesService.update(id, updateVehicleDto);
    }
    async remove(id) {
        await this.vehiclesService.remove(id);
        return { message: 'Vehicle deleted successfully' };
    }
    async getVehicleServiceHistory(id, queryDto) {
        return this.vehiclesService.getVehicleServiceHistory(id, queryDto);
    }
    async updateMileage(id, body) {
        return this.vehiclesService.updateMileage(id, body.mileage);
    }
};
exports.VehiclesController = VehiclesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Register a new vehicle' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Vehicle registered successfully',
        type: vehicle_entity_1.Vehicle,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Customer not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Plate number or VIN already exists' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateVehicleDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all vehicles with pagination and filtering' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Vehicles retrieved successfully',
        type: (pagination_response_dto_1.PaginationResponseDto),
    }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryVehicleDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get vehicle by ID with relationships' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vehicle ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Vehicle retrieved successfully',
        type: vehicle_entity_1.Vehicle,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicle not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update vehicle by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vehicle ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Vehicle updated successfully',
        type: vehicle_entity_1.Vehicle,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicle not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Plate number or VIN already exists' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateVehicleDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete vehicle by ID (soft delete)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vehicle ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Vehicle deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicle not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get vehicle service history' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vehicle ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Vehicle service history retrieved successfully',
        type: (pagination_response_dto_1.PaginationResponseDto),
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicle not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)(':id/service-history'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.QueryVehicleDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "getVehicleServiceHistory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update vehicle mileage' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vehicle ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Vehicle mileage updated successfully',
        type: vehicle_entity_1.Vehicle,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid mileage value' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicle not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Patch)(':id/mileage'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "updateMileage", null);
exports.VehiclesController = VehiclesController = __decorate([
    (0, swagger_1.ApiTags)('Vehicles'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_2.RolesGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('vehicles'),
    __metadata("design:paramtypes", [vehicles_service_1.VehiclesService])
], VehiclesController);
//# sourceMappingURL=vehicles.controller.js.map