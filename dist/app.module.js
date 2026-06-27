"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const database_config_1 = require("./config/database.config");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const customers_module_1 = require("./modules/customers/customers.module");
const vehicles_module_1 = require("./modules/vehicles/vehicles.module");
const mechanics_module_1 = require("./modules/mechanics/mechanics.module");
const suppliers_module_1 = require("./modules/suppliers/suppliers.module");
const spare_parts_module_1 = require("./modules/spare-parts/spare-parts.module");
const appointments_module_1 = require("./modules/appointments/appointments.module");
const service_orders_module_1 = require("./modules/service-orders/service-orders.module");
const inventory_transactions_module_1 = require("./modules/inventory-transactions/inventory-transactions.module");
const invoices_module_1 = require("./modules/invoices/invoices.module");
const payments_module_1 = require("./modules/payments/payments.module");
const reports_module_1 = require("./modules/reports/reports.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env'],
                ignoreEnvFile: !!process.env.DATABASE_URL,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: database_config_1.getDatabaseConfig,
                inject: [config_1.ConfigService],
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            customers_module_1.CustomersModule,
            vehicles_module_1.VehiclesModule,
            mechanics_module_1.MechanicsModule,
            suppliers_module_1.SuppliersModule,
            spare_parts_module_1.SparePartsModule,
            appointments_module_1.AppointmentsModule,
            service_orders_module_1.ServiceOrdersModule,
            inventory_transactions_module_1.InventoryTransactionsModule,
            invoices_module_1.InvoicesModule,
            payments_module_1.PaymentsModule,
            reports_module_1.ReportsModule,
            dashboard_module_1.DashboardModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map