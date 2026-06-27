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
exports.Vehicle = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const fuel_type_enum_1 = require("../../../common/enums/fuel-type.enum");
const customer_entity_1 = require("../../customers/entities/customer.entity");
const appointment_entity_1 = require("../../appointments/entities/appointment.entity");
const service_order_entity_1 = require("../../service-orders/entities/service-order.entity");
let Vehicle = class Vehicle extends base_entity_1.BaseEntity {
    customerId;
    make;
    model;
    year;
    color;
    plateNumber;
    vinNumber;
    mileage;
    fuelType;
    customer;
    appointments;
    serviceOrders;
};
exports.Vehicle = Vehicle;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Vehicle.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Vehicle.prototype, "make", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Vehicle.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Vehicle.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, unique: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "plateNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 17, unique: true, nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "vinNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Vehicle.prototype, "mileage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: fuel_type_enum_1.FuelType,
        nullable: true,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "fuelType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.vehicles),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    __metadata("design:type", customer_entity_1.Customer)
], Vehicle.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointment_entity_1.Appointment, (appointment) => appointment.vehicle),
    __metadata("design:type", Array)
], Vehicle.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_order_entity_1.ServiceOrder, (serviceOrder) => serviceOrder.vehicle),
    __metadata("design:type", Array)
], Vehicle.prototype, "serviceOrders", void 0);
exports.Vehicle = Vehicle = __decorate([
    (0, typeorm_1.Entity)('vehicles')
], Vehicle);
//# sourceMappingURL=vehicle.entity.js.map