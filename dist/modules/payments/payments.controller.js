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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payments_service_1 = require("./payments.service");
const payment_entity_1 = require("./entities/payment.entity");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    create(createPaymentDto) {
        return this.paymentsService.create(createPaymentDto);
    }
    findOne(id) {
        return this.paymentsService.findOne(id);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER, user_role_enum_1.UserRole.RECEPTIONIST),
    (0, swagger_1.ApiOperation)({ summary: 'Create payment for invoice' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Payment created successfully',
        type: payment_entity_1.Payment,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invoice already paid or payment exceeds balance' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Invoice not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.SERVICE_MANAGER, user_role_enum_1.UserRole.RECEPTIONIST),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Payment ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment retrieved successfully',
        type: payment_entity_1.Payment,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "findOne", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)('Payments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map