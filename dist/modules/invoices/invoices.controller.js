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
exports.InvoicesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const invoices_service_1 = require("./invoices.service");
const invoice_entity_1 = require("./entities/invoice.entity");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
let InvoicesController = class InvoicesController {
    invoicesService;
    constructor(invoicesService) {
        this.invoicesService = invoicesService;
    }
    create(createInvoiceDto) {
        return this.invoicesService.create(createInvoiceDto);
    }
    findOne(id) {
        return this.invoicesService.findOne(id);
    }
    markAsPaid(id) {
        return this.invoicesService.markAsPaid(id);
    }
};
exports.InvoicesController = InvoicesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER, user_role_enum_1.UserRole.RECEPTIONIST),
    (0, swagger_1.ApiOperation)({ summary: 'Create invoice for completed service order' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Invoice created successfully',
        type: invoice_entity_1.Invoice,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Service order not completed or invoice already exists' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Service order not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_dto_1.CreateInvoiceDto]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER, user_role_enum_1.UserRole.RECEPTIONIST),
    (0, swagger_1.ApiOperation)({ summary: 'Get invoice by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Invoice ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Invoice retrieved successfully',
        type: invoice_entity_1.Invoice,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Invoice not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/mark-paid'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER, user_role_enum_1.UserRole.RECEPTIONIST),
    (0, swagger_1.ApiOperation)({ summary: 'Mark invoice as paid' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Invoice ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Invoice marked as paid successfully',
        type: invoice_entity_1.Invoice,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invoice already paid' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Invoice not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "markAsPaid", null);
exports.InvoicesController = InvoicesController = __decorate([
    (0, swagger_1.ApiTags)('Invoices'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('invoices'),
    __metadata("design:paramtypes", [invoices_service_1.InvoicesService])
], InvoicesController);
//# sourceMappingURL=invoices.controller.js.map