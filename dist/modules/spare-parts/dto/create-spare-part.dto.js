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
exports.CreateSparePartDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSparePartDto {
    sku;
    name;
    category;
    description;
    quantity;
    minimumStock;
    purchasePrice;
    sellingPrice;
    supplierId;
}
exports.CreateSparePartDto = CreateSparePartDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stock Keeping Unit (SKU) - unique identifier',
        example: 'BP001',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Z0-9-]{3,20}$/i, {
        message: 'SKU must contain only letters, numbers, and hyphens (3-20 characters)',
    }),
    __metadata("design:type", String)
], CreateSparePartDto.prototype, "sku", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the spare part',
        example: 'Brake Pads - Front',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateSparePartDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category of the spare part',
        example: 'Brakes',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateSparePartDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed description of the spare part',
        example: 'Premium ceramic brake pads for front wheels',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateSparePartDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current quantity in stock',
        example: 50,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSparePartDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Minimum stock level for alerts',
        example: 10,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSparePartDto.prototype, "minimumStock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Purchase price from supplier',
        example: 45.99,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSparePartDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Selling price to customers',
        example: 69.99,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSparePartDto.prototype, "sellingPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Supplier ID',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        format: 'uuid',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSparePartDto.prototype, "supplierId", void 0);
//# sourceMappingURL=create-spare-part.dto.js.map