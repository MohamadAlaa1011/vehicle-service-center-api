import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { ServiceOrder } from '../service-orders/entities/service-order.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { SparePart } from '../spare-parts/entities/spare-part.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customer,
      Vehicle,
      ServiceOrder,
      Appointment,
      SparePart,
      Invoice,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}