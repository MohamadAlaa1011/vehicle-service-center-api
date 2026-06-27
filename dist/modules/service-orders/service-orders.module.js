"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOrdersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_orders_service_1 = require("./service-orders.service");
const service_orders_controller_1 = require("./service-orders.controller");
const service_order_entity_1 = require("./entities/service-order.entity");
const service_part_entity_1 = require("./entities/service-part.entity");
const customer_entity_1 = require("../customers/entities/customer.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
const mechanic_entity_1 = require("../mechanics/entities/mechanic.entity");
const spare_part_entity_1 = require("../spare-parts/entities/spare-part.entity");
const inventory_transaction_entity_1 = require("../inventory-transactions/entities/inventory-transaction.entity");
let ServiceOrdersModule = class ServiceOrdersModule {
};
exports.ServiceOrdersModule = ServiceOrdersModule;
exports.ServiceOrdersModule = ServiceOrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                service_order_entity_1.ServiceOrder,
                service_part_entity_1.ServicePart,
                customer_entity_1.Customer,
                vehicle_entity_1.Vehicle,
                mechanic_entity_1.Mechanic,
                spare_part_entity_1.SparePart,
                inventory_transaction_entity_1.InventoryTransaction,
            ]),
        ],
        controllers: [service_orders_controller_1.ServiceOrdersController],
        providers: [service_orders_service_1.ServiceOrdersService],
        exports: [service_orders_service_1.ServiceOrdersService],
    })
], ServiceOrdersModule);
//# sourceMappingURL=service-orders.module.js.map