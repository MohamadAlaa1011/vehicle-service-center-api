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
exports.ServiceOrder = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const service_order_status_enum_1 = require("../../../common/enums/service-order-status.enum");
const service_order_priority_enum_1 = require("../../../common/enums/service-order-priority.enum");
const customer_entity_1 = require("../../customers/entities/customer.entity");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
const mechanic_entity_1 = require("../../mechanics/entities/mechanic.entity");
const service_part_entity_1 = require("./service-part.entity");
const invoice_entity_1 = require("../../invoices/entities/invoice.entity");
let ServiceOrder = class ServiceOrder extends base_entity_1.BaseEntity {
    orderNumber;
    customerId;
    vehicleId;
    assignedMechanicId;
    issueDescription;
    diagnosis;
    laborCost;
    status;
    priority;
    startDate;
    completionDate;
    customer;
    vehicle;
    assignedMechanic;
    serviceParts;
    invoice;
};
exports.ServiceOrder = ServiceOrder;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], ServiceOrder.prototype, "orderNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ServiceOrder.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ServiceOrder.prototype, "vehicleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ServiceOrder.prototype, "assignedMechanicId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ServiceOrder.prototype, "issueDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ServiceOrder.prototype, "diagnosis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], ServiceOrder.prototype, "laborCost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: service_order_status_enum_1.ServiceOrderStatus,
        default: service_order_status_enum_1.ServiceOrderStatus.PENDING,
    }),
    __metadata("design:type", String)
], ServiceOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: service_order_priority_enum_1.ServiceOrderPriority,
        default: service_order_priority_enum_1.ServiceOrderPriority.MEDIUM,
    }),
    __metadata("design:type", String)
], ServiceOrder.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ServiceOrder.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ServiceOrder.prototype, "completionDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.serviceOrders),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    __metadata("design:type", customer_entity_1.Customer)
], ServiceOrder.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.serviceOrders),
    (0, typeorm_1.JoinColumn)({ name: 'vehicleId' }),
    __metadata("design:type", vehicle_entity_1.Vehicle)
], ServiceOrder.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mechanic_entity_1.Mechanic, (mechanic) => mechanic.assignedServiceOrders),
    (0, typeorm_1.JoinColumn)({ name: 'assignedMechanicId' }),
    __metadata("design:type", mechanic_entity_1.Mechanic)
], ServiceOrder.prototype, "assignedMechanic", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_part_entity_1.ServicePart, (servicePart) => servicePart.serviceOrder),
    __metadata("design:type", Array)
], ServiceOrder.prototype, "serviceParts", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => invoice_entity_1.Invoice, (invoice) => invoice.serviceOrder),
    __metadata("design:type", invoice_entity_1.Invoice)
], ServiceOrder.prototype, "invoice", void 0);
exports.ServiceOrder = ServiceOrder = __decorate([
    (0, typeorm_1.Entity)('service_orders')
], ServiceOrder);
//# sourceMappingURL=service-order.entity.js.map