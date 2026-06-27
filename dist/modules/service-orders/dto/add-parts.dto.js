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
exports.AddPartsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ServicePartDto {
    partId;
    quantity;
    unitPrice;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Spare part ID',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d482',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ServicePartDto.prototype, "partId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of parts used',
        example: 2,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ServicePartDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unit price charged to customer (optional, defaults to part selling price)',
        example: 45.99,
        required: false,
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ServicePartDto.prototype, "unitPrice", void 0);
class AddPartsDto {
    parts;
}
exports.AddPartsDto = AddPartsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of parts used in the service order',
        type: [ServicePartDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ServicePartDto),
    __metadata("design:type", Array)
], AddPartsDto.prototype, "parts", void 0);
//# sourceMappingURL=add-parts.dto.js.map