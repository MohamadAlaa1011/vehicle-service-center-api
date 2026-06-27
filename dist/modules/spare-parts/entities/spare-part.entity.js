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
exports.SparePart = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const supplier_entity_1 = require("../../suppliers/entities/supplier.entity");
const service_part_entity_1 = require("../../service-orders/entities/service-part.entity");
const inventory_transaction_entity_1 = require("../../inventory-transactions/entities/inventory-transaction.entity");
let SparePart = class SparePart extends base_entity_1.BaseEntity {
    sku;
    name;
    category;
    description;
    quantity;
    minimumStock;
    purchasePrice;
    sellingPrice;
    supplierId;
    supplier;
    serviceParts;
    inventoryTransactions;
};
exports.SparePart = SparePart;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], SparePart.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], SparePart.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], SparePart.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SparePart.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SparePart.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SparePart.prototype, "minimumStock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SparePart.prototype, "purchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SparePart.prototype, "sellingPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], SparePart.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier, (supplier) => supplier.spareParts),
    (0, typeorm_1.JoinColumn)({ name: 'supplierId' }),
    __metadata("design:type", supplier_entity_1.Supplier)
], SparePart.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_part_entity_1.ServicePart, (servicePart) => servicePart.part),
    __metadata("design:type", Array)
], SparePart.prototype, "serviceParts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_transaction_entity_1.InventoryTransaction, (transaction) => transaction.part),
    __metadata("design:type", Array)
], SparePart.prototype, "inventoryTransactions", void 0);
exports.SparePart = SparePart = __decorate([
    (0, typeorm_1.Entity)('spare_parts')
], SparePart);
//# sourceMappingURL=spare-part.entity.js.map