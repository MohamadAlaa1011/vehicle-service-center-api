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
exports.InventoryTransaction = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const transaction_type_enum_1 = require("../../../common/enums/transaction-type.enum");
const spare_part_entity_1 = require("../../spare-parts/entities/spare-part.entity");
let InventoryTransaction = class InventoryTransaction extends base_entity_1.BaseEntity {
    partId;
    type;
    quantity;
    reason;
    referenceId;
    part;
};
exports.InventoryTransaction = InventoryTransaction;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], InventoryTransaction.prototype, "partId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: transaction_type_enum_1.TransactionType,
    }),
    __metadata("design:type", String)
], InventoryTransaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], InventoryTransaction.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], InventoryTransaction.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], InventoryTransaction.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => spare_part_entity_1.SparePart, (sparePart) => sparePart.inventoryTransactions),
    (0, typeorm_1.JoinColumn)({ name: 'partId' }),
    __metadata("design:type", spare_part_entity_1.SparePart)
], InventoryTransaction.prototype, "part", void 0);
exports.InventoryTransaction = InventoryTransaction = __decorate([
    (0, typeorm_1.Entity)('inventory_transactions')
], InventoryTransaction);
//# sourceMappingURL=inventory-transaction.entity.js.map