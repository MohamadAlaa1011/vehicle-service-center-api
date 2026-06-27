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
exports.CreateCustomerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCustomerDto {
    fullName;
    phone;
    email;
    address;
    notes;
}
exports.CreateCustomerDto = CreateCustomerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full name of the customer',
        example: 'John Doe',
        minLength: 2,
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number of the customer',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+?[\d\s-()]{10,20}$/, {
        message: 'Phone number must be valid',
    }),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address of the customer',
        example: 'john.doe@example.com',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Address of the customer',
        example: '123 Main Street, City, State 12345',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional notes about the customer',
        example: 'Regular customer, prefers morning appointments',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "notes", void 0);
//# sourceMappingURL=create-customer.dto.js.map