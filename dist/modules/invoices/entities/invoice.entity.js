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
exports.Invoice = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const invoice_status_enum_1 = require("../../../common/enums/invoice-status.enum");
const service_order_entity_1 = require("../../service-orders/entities/service-order.entity");
const payment_entity_1 = require("../../payments/entities/payment.entity");
let Invoice = class Invoice extends base_entity_1.BaseEntity {
    invoiceNumber;
    serviceOrderId;
    laborAmount;
    partsAmount;
    taxAmount;
    discountAmount;
    totalAmount;
    status;
    serviceOrder;
    payments;
};
exports.Invoice = Invoice;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Invoice.prototype, "invoiceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Invoice.prototype, "serviceOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "laborAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "partsAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "taxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "discountAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Invoice.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: invoice_status_enum_1.InvoiceStatus,
        default: invoice_status_enum_1.InvoiceStatus.UNPAID,
    }),
    __metadata("design:type", String)
], Invoice.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => service_order_entity_1.ServiceOrder, (serviceOrder) => serviceOrder.invoice),
    (0, typeorm_1.JoinColumn)({ name: 'serviceOrderId' }),
    __metadata("design:type", service_order_entity_1.ServiceOrder)
], Invoice.prototype, "serviceOrder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, (payment) => payment.invoice),
    __metadata("design:type", Array)
], Invoice.prototype, "payments", void 0);
exports.Invoice = Invoice = __decorate([
    (0, typeorm_1.Entity)('invoices')
], Invoice);
//# sourceMappingURL=invoice.entity.js.map