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
exports.CreateVehicleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const fuel_type_enum_1 = require("../../../common/enums/fuel-type.enum");
class CreateVehicleDto {
    customerId;
    make;
    model;
    year;
    color;
    plateNumber;
    vinNumber;
    mileage;
    fuelType;
}
exports.CreateVehicleDto = CreateVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer ID who owns this vehicle',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        format: 'uuid',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle manufacturer/make',
        example: 'Toyota',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "make", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle model',
        example: 'Camry',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Manufacturing year',
        example: 2020,
        minimum: 1900,
        maximum: 2030,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(2030),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle color',
        example: 'Silver',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'License plate number',
        example: 'ABC123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Z0-9-]{2,20}$/i, {
        message: 'Plate number must contain only letters, numbers, and hyphens',
    }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "plateNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle Identification Number (VIN)',
        example: '1HGCM82633A123456',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-HJ-NPR-Z0-9]{17}$/i, {
        message: 'VIN must be exactly 17 characters (excluding I, O, Q)',
    }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "vinNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current mileage/odometer reading',
        example: 45000,
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fuel type of the vehicle',
        enum: fuel_type_enum_1.FuelType,
        example: fuel_type_enum_1.FuelType.GASOLINE,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(fuel_type_enum_1.FuelType),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "fuelType", void 0);
//# sourceMappingURL=create-vehicle.dto.js.map