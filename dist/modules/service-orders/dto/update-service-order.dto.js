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
exports.UpdateServiceOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_service_order_dto_1 = require("./create-service-order.dto");
const service_order_status_enum_1 = require("../../../common/enums/service-order-status.enum");
const service_order_priority_enum_1 = require("../../../common/enums/service-order-priority.enum");
class UpdateServiceOrderDto extends (0, swagger_1.PartialType)(create_service_order_dto_1.CreateServiceOrderDto) {
    diagnosis;
    status;
    laborCost;
    priority;
    completionDate;
}
exports.UpdateServiceOrderDto = UpdateServiceOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mechanic diagnosis of the issue',
        example: 'Worn brake pads causing squealing noise',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateServiceOrderDto.prototype, "diagnosis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current status of the service order',
        enum: service_order_status_enum_1.ServiceOrderStatus,
        example: service_order_status_enum_1.ServiceOrderStatus.IN_PROGRESS,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(service_order_status_enum_1.ServiceOrderStatus),
    __metadata("design:type", String)
], UpdateServiceOrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Labor cost for the service',
        example: 200.00,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], UpdateServiceOrderDto.prototype, "laborCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Priority level of the service order',
        enum: service_order_priority_enum_1.ServiceOrderPriority,
        example: service_order_priority_enum_1.ServiceOrderPriority.HIGH,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(service_order_priority_enum_1.ServiceOrderPriority),
    __metadata("design:type", String)
], UpdateServiceOrderDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Actual completion date',
        example: '2026-06-16T15:30:00.000Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateServiceOrderDto.prototype, "completionDate", void 0);
//# sourceMappingURL=update-service-order.dto.js.map