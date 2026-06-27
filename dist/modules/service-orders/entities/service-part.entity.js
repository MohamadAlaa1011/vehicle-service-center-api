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
exports.ServicePart = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const service_order_entity_1 = require("./service-order.entity");
const spare_part_entity_1 = require("../../spare-parts/entities/spare-part.entity");
let ServicePart = class ServicePart extends base_entity_1.BaseEntity {
    serviceOrderId;
    partId;
    quantity;
    unitPrice;
    totalPrice;
    serviceOrder;
    part;
};
exports.ServicePart = ServicePart;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ServicePart.prototype, "serviceOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ServicePart.prototype, "partId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ServicePart.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ServicePart.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ServicePart.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_order_entity_1.ServiceOrder, (serviceOrder) => serviceOrder.serviceParts),
    (0, typeorm_1.JoinColumn)({ name: 'serviceOrderId' }),
    __metadata("design:type", service_order_entity_1.ServiceOrder)
], ServicePart.prototype, "serviceOrder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => spare_part_entity_1.SparePart, (sparePart) => sparePart.serviceParts),
    (0, typeorm_1.JoinColumn)({ name: 'partId' }),
    __metadata("design:type", spare_part_entity_1.SparePart)
], ServicePart.prototype, "part", void 0);
exports.ServicePart = ServicePart = __decorate([
    (0, typeorm_1.Entity)('service_parts')
], ServicePart);
//# sourceMappingURL=service-part.entity.js.map