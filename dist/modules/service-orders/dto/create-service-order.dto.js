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
exports.CreateServiceOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const service_order_priority_enum_1 = require("../../../common/enums/service-order-priority.enum");
class CreateServiceOrderDto {
    customerId;
    vehicleId;
    assignedMechanicId;
    issueDescription;
    laborCost;
    priority;
    startDate;
}
exports.CreateServiceOrderDto = CreateServiceOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer ID who owns the vehicle',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateServiceOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle ID for the service',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateServiceOrderDto.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Assigned mechanic ID',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateServiceOrderDto.prototype, "assignedMechanicId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the issue reported by customer',
        example: 'Engine making strange noise during acceleration',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateServiceOrderDto.prototype, "issueDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Labor cost for the service',
        example: 150.00,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], CreateServiceOrderDto.prototype, "laborCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Priority level of the service order',
        enum: service_order_priority_enum_1.ServiceOrderPriority,
        example: service_order_priority_enum_1.ServiceOrderPriority.MEDIUM,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(service_order_priority_enum_1.ServiceOrderPriority),
    __metadata("design:type", String)
], CreateServiceOrderDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Scheduled start date for the service',
        example: '2026-06-15T09:00:00.000Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateServiceOrderDto.prototype, "startDate", void 0);
//# sourceMappingURL=create-service-order.dto.js.map