import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { getDatabaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CustomersModule } from './modules/customers/customers.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { MechanicsModule } from './modules/mechanics/mechanics.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { SparePartsModule } from './modules/spare-parts/spare-parts.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { ServiceOrdersModule } from './modules/service-orders/service-orders.module';
import { InventoryTransactionsModule } from './modules/inventory-transactions/inventory-transactions.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReportsModule } from './modules/reports/reports.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.production'],
      ignoreEnvFile: process.env.DATABASE_URL !== undefined,
    }),
    
    // Database
    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),

    // Rate Limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),

    // Feature Modules
    AuthModule,
    UsersModule,
    CustomersModule,
    VehiclesModule,
    MechanicsModule,
    SuppliersModule,
    SparePartsModule,
    AppointmentsModule,
    ServiceOrdersModule,
    InventoryTransactionsModule,
    InvoicesModule,
    PaymentsModule,
    ReportsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
