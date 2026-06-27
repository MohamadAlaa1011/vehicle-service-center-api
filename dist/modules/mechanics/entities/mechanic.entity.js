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
exports.Mechanic = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const base_entity_1 = require("../../../common/base/base.entity");
const user_status_enum_1 = require("../../../common/enums/user-status.enum");
const user_entity_1 = require("../../users/entities/user.entity");
const service_order_entity_1 = require("../../service-orders/entities/service-order.entity");
let Mechanic = class Mechanic extends base_entity_1.BaseEntity {
    userId;
    specialization;
    hireDate;
    salary;
    status;
    user;
    assignedServiceOrders;
};
exports.Mechanic = Mechanic;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Mechanic.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Mechanic.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Mechanic.prototype, "hireDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", Number)
], Mechanic.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_status_enum_1.UserStatus,
        default: user_status_enum_1.UserStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Mechanic.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.mechanic),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Mechanic.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_order_entity_1.ServiceOrder, (serviceOrder) => serviceOrder.assignedMechanic),
    __metadata("design:type", Array)
], Mechanic.prototype, "assignedServiceOrders", void 0);
exports.Mechanic = Mechanic = __decorate([
    (0, typeorm_1.Entity)('mechanics')
], Mechanic);
//# sourceMappingURL=mechanic.entity.js.map