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
exports.QueryServiceOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
const service_order_status_enum_1 = require("../../../common/enums/service-order-status.enum");
const service_order_priority_enum_1 = require("../../../common/enums/service-order-priority.enum");
class QueryServiceOrderDto extends pagination_dto_1.PaginationDto {
    customerId;
    vehicleId;
    mechanicId;
    status;
    priority;
}
exports.QueryServiceOrderDto = QueryServiceOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by customer ID',
        required: false,
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryServiceOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by vehicle ID',
        required: false,
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryServiceOrderDto.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by assigned mechanic ID',
        required: false,
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryServiceOrderDto.prototype, "mechanicId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by service order status',
        enum: service_order_status_enum_1.ServiceOrderStatus,
        required: false,
        example: service_order_status_enum_1.ServiceOrderStatus.IN_PROGRESS,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(service_order_status_enum_1.ServiceOrderStatus),
    __metadata("design:type", String)
], QueryServiceOrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by priority level',
        enum: service_order_priority_enum_1.ServiceOrderPriority,
        required: false,
        example: service_order_priority_enum_1.ServiceOrderPriority.HIGH,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(service_order_priority_enum_1.ServiceOrderPriority),
    __metadata("design:type", String)
], QueryServiceOrderDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search by order number or issue description',
        required: false,
        example: 'brake',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryServiceOrderDto.prototype, "search", void 0);
//# sourceMappingURL=query-service-order.dto.js.map