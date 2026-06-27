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
exports.SparePartsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const spare_parts_service_1 = require("./spare-parts.service");
const dto_1 = require("./dto");
const spare_part_entity_1 = require("./entities/spare-part.entity");
const guards_1 = require("../auth/guards");
const guards_2 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const enums_1 = require("../../common/enums");
const pagination_response_dto_1 = require("../../common/dto/pagination-response.dto");
let SparePartsController = class SparePartsController {
    sparePartsService;
    constructor(sparePartsService) {
        this.sparePartsService = sparePartsService;
    }
    async create(createSparePartDto) {
        return this.sparePartsService.create(createSparePartDto);
    }
    async findAll(queryDto) {
        return this.sparePartsService.findAll(queryDto);
    }
    async getLowStockAlerts() {
        return this.sparePartsService.getLowStockAlerts();
    }
    async getPartsByCategory() {
        return this.sparePartsService.getPartsByCategory();
    }
    async findOne(id) {
        return this.sparePartsService.findOne(id);
    }
    async update(id, updateSparePartDto) {
        return this.sparePartsService.update(id, updateSparePartDto);
    }
    async remove(id) {
        await this.sparePartsService.remove(id);
        return { message: 'Spare part deleted successfully' };
    }
    async adjustStock(id, adjustStockDto) {
        return this.sparePartsService.adjustStock(id, adjustStockDto);
    }
};
exports.SparePartsController = SparePartsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new spare part' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Spare part created successfully',
        type: spare_part_entity_1.SparePart,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Supplier not found or validation error' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'SKU already exists' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateSparePartDto]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all spare parts with pagination and filtering' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Spare parts retrieved successfully',
        type: (pagination_response_dto_1.PaginationResponseDto),
    }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QuerySparePartDto]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get low stock alerts' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Low stock parts retrieved successfully',
        type: [spare_part_entity_1.SparePart],
    }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)('low-stock'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "getLowStockAlerts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get parts grouped by category with statistics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Parts by category retrieved successfully',
    }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER),
    (0, common_1.Get)('by-category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "getPartsByCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get spare part by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Spare part ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Spare part retrieved successfully',
        type: spare_part_entity_1.SparePart,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Spare part not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update spare part by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Spare part ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Spare part updated successfully',
        type: spare_part_entity_1.SparePart,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Spare part not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'SKU already exists' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateSparePartDto]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete spare part by ID (soft delete)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Spare part ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Spare part deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Spare part not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Adjust spare part inventory' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Spare part ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Inventory adjusted successfully',
        type: spare_part_entity_1.SparePart,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Insufficient stock' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Spare part not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER),
    (0, common_1.Post)(':id/adjust-stock'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.AdjustStockDto]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "adjustStock", null);
exports.SparePartsController = SparePartsController = __decorate([
    (0, swagger_1.ApiTags)('Spare Parts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_2.RolesGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('spare-parts'),
    __metadata("design:paramtypes", [spare_parts_service_1.SparePartsService])
], SparePartsController);
//# sourceMappingURL=spare-parts.controller.js.map