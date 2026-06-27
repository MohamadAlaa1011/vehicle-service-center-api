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
exports.Appointment = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const appointment_status_enum_1 = require("../../../common/enums/appointment-status.enum");
const customer_entity_1 = require("../../customers/entities/customer.entity");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
let Appointment = class Appointment extends base_entity_1.BaseEntity {
    customerId;
    vehicleId;
    appointmentDate;
    appointmentTime;
    status;
    notes;
    customer;
    vehicle;
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Appointment.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Appointment.prototype, "vehicleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Appointment.prototype, "appointmentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Appointment.prototype, "appointmentTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: appointment_status_enum_1.AppointmentStatus,
        default: appointment_status_enum_1.AppointmentStatus.SCHEDULED,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.appointments),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    __metadata("design:type", customer_entity_1.Customer)
], Appointment.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.appointments),
    (0, typeorm_1.JoinColumn)({ name: 'vehicleId' }),
    __metadata("design:type", vehicle_entity_1.Vehicle)
], Appointment.prototype, "vehicle", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)('appointments')
], Appointment);
//# sourceMappingURL=appointment.entity.js.map