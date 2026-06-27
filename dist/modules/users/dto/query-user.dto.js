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
exports.QueryUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
const user_role_enum_1 = require("../../../common/enums/user-role.enum");
const user_status_enum_1 = require("../../../common/enums/user-status.enum");
class QueryUserDto extends pagination_dto_1.PaginationDto {
    role;
    status;
}
exports.QueryUserDto = QueryUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by user role',
        enum: user_role_enum_1.UserRole,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole),
    __metadata("design:type", String)
], QueryUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by user status',
        enum: user_status_enum_1.UserStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_status_enum_1.UserStatus),
    __metadata("design:type", String)
], QueryUserDto.prototype, "status", void 0);
//# sourceMappingURL=query-user.dto.js.map