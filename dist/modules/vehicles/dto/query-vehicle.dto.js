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
exports.QueryVehicleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
const fuel_type_enum_1 = require("../../../common/enums/fuel-type.enum");
class QueryVehicleDto extends pagination_dto_1.PaginationDto {
    customerId;
    make;
    year;
    fuelType;
}
exports.QueryVehicleDto = QueryVehicleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by customer ID',
        format: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryVehicleDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by vehicle make',
        example: 'Toyota',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryVehicleDto.prototype, "make", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by manufacturing year',
        example: 2020,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(2030),
    __metadata("design:type", Number)
], QueryVehicleDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by fuel type',
        enum: fuel_type_enum_1.FuelType,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(fuel_type_enum_1.FuelType),
    __metadata("design:type", String)
], QueryVehicleDto.prototype, "fuelType", void 0);
//# sourceMappingURL=query-vehicle.dto.js.map