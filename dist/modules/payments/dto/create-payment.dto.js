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
exports.CreatePaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const payment_method_enum_1 = require("../../../common/enums/payment-method.enum");
class CreatePaymentDto {
    invoiceId;
    paymentMethod;
    amount;
    transactionReference;
}
exports.CreatePaymentDto = CreatePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Invoice ID to create payment for',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "invoiceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment method used',
        enum: payment_method_enum_1.PaymentMethod,
        example: payment_method_enum_1.PaymentMethod.CARD,
    }),
    (0, class_validator_1.IsEnum)(payment_method_enum_1.PaymentMethod),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment amount',
        example: 395.50,
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Transaction reference number',
        example: 'TXN-12345678',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "transactionReference", void 0);
//# sourceMappingURL=create-payment.dto.js.map