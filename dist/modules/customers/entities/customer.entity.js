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
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
const appointment_entity_1 = require("../../appointments/entities/appointment.entity");
const service_order_entity_1 = require("../../service-orders/entities/service-order.entity");
let Customer = class Customer extends base_entity_1.BaseEntity {
    fullName;
    phone;
    email;
    address;
    notes;
    vehicles;
    appointments;
    serviceOrders;
};
exports.Customer = Customer;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Customer.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Customer.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.customer),
    __metadata("design:type", Array)
], Customer.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointment_entity_1.Appointment, (appointment) => appointment.customer),
    __metadata("design:type", Array)
], Customer.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_order_entity_1.ServiceOrder, (serviceOrder) => serviceOrder.customer),
    __metadata("design:type", Array)
], Customer.prototype, "serviceOrders", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)('customers')
], Customer);
//# sourceMappingURL=customer.entity.js.map