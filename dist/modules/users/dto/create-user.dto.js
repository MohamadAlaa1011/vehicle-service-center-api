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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_role_enum_1 = require("../../../common/enums/user-role.enum");
const user_status_enum_1 = require("../../../common/enums/user-status.enum");
class CreateUserDto {
    fullName;
    email;
    phone;
    password;
    role;
    status = user_status_enum_1.UserStatus.ACTIVE;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full name of the user',
        example: 'John Doe',
        minLength: 2,
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateUserDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address of the user',
        example: 'john.doe@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number of the user',
        example: '+1234567890',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+?[\d\s-()]{10,20}$/, {
        message: 'Phone number must be valid',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password for the user (minimum 8 characters)',
        example: 'SecurePassword123!',
        minLength: 8,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Role of the user',
        enum: user_role_enum_1.UserRole,
        example: user_role_enum_1.UserRole.RECEPTIONIST,
    }),
    (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the user',
        enum: user_status_enum_1.UserStatus,
        example: user_status_enum_1.UserStatus.ACTIVE,
        required: false,
        default: user_status_enum_1.UserStatus.ACTIVE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_status_enum_1.UserStatus),
    __metadata("design:type", String)
], CreateUserDto.prototype, "status", void 0);
//# sourceMappingURL=create-user.dto.js.map