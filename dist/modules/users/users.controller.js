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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const dto_1 = require("./dto");
const user_entity_1 = require("./entities/user.entity");
const guards_1 = require("../auth/guards");
const guards_2 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const enums_1 = require("../../common/enums");
const pagination_response_dto_1 = require("../../common/dto/pagination-response.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async findAll(queryDto) {
        return this.usersService.findAll(queryDto);
    }
    async findOne(id) {
        return this.usersService.findOne(id);
    }
    async update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    async remove(id) {
        await this.usersService.remove(id);
        return { message: 'User deleted successfully' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User created successfully',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User already exists' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users with pagination and filtering' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Users retrieved successfully',
        type: (pagination_response_dto_1.PaginationResponseDto),
    }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User retrieved successfully',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User updated successfully',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email already exists' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SERVICE_MANAGER),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by ID (soft delete)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID', format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_2.RolesGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map