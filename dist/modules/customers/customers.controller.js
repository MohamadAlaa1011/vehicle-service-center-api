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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customers_service_1 = require("./customers.service");
const dto_1 = require("./dto");
const customer_entity_1 = require("./entities/customer.entity");
const guards_1 = require("../auth/guards");
const guards_2 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const enums_1 = require("../../common/enums");
const pagination_response_dto_1 = require("../../common/dto/pagination-response.dto");
let CustomersController = class CustomersController {
    customersService;
    constructor(customersService) {
        this.customersService = customersService;
    }
    async create(createCustomerDto) {
        return this.customersService.create(createCustomerDto);
    }
    async findAll(queryDto) {
        return this.customersService.findAll(queryDto);
    }
    async findOne(id) {
        return this.customersService.findOne(id);
    }
    async update(id, updateCustomerDto) {
        return this.customersService.update(id, updateCustomerDto);
    }
    async remove(id) {
        await this.customersService.remove(id);
        return { message: 'Customer deleted successfully' };
    }
    async getCustomerVehicles(id, queryDto) {
        return this.customersService.getCustomerVehicles(id, queryDto);
    }
    async getCustomerServiceHistory(id, queryDto) {
        return this.customersService.getCustomerServiceHistory(id, queryDto);
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new customer' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Customer created successfully',
        type: customer_entity_1.Customer,
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Customer with email already exists' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all customers with pagination and filtering' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Customers retrieved successfully',
        type: (pagination_response_dto_1.PaginationResponseDto),
    }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get customer by ID with relationships' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Customer retrieved successfully',
        type: customer_entity_1.Customer,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update customer by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Customer updated successfully',
        type: customer_entity_1.Customer,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email already exists' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete customer by ID (soft delete)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Customer deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all vehicles owned by customer' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Customer vehicles retrieved successfully',
        type: (pagination_response_dto_1.PaginationResponseDto),
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)(':id/vehicles'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.QueryCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getCustomerVehicles", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get customer service history' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Customer service history retrieved successfully',
        type: (pagination_response_dto_1.PaginationResponseDto),
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER, enums_1.UserRole.MECHANIC, enums_1.UserRole.RECEPTIONIST),
    (0, common_1.Get)(':id/service-history'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.QueryCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getCustomerServiceHistory", null);
exports.CustomersController = CustomersController = __decorate([
    (0, swagger_1.ApiTags)('Customers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_2.RolesGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('customers'),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map