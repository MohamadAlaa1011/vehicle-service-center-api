import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceOrdersService } from './service-orders.service';
import { ServiceOrdersController } from './service-orders.controller';
import { ServiceOrder } from './entities/service-order.entity';
import { ServicePart } from './entities/service-part.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Mechanic } from '../mechanics/entities/mechanic.entity';
import { SparePart } from '../spare-parts/entities/spare-part.entity';
import { InventoryTransaction } from '../inventory-transactions/entities/inventory-transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceOrder,
      ServicePart,
      Customer,
      Vehicle,
      Mechanic,
      SparePart,
      InventoryTransaction,
    ]),
  ],
  controllers: [ServiceOrdersController],
  providers: [ServiceOrdersService],
  exports: [ServiceOrdersService],
})
export class ServiceOrdersModule {}