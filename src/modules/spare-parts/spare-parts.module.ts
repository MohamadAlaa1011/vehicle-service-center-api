import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from './entities/spare-part.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { InventoryTransaction } from '../inventory-transactions/entities/inventory-transaction.entity';
import { SparePartsService } from './spare-parts.service';
import { SparePartsController } from './spare-parts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart, Supplier, InventoryTransaction])],
  controllers: [SparePartsController],
  providers: [SparePartsService],
  exports: [SparePartsService],
})
export class SparePartsModule {}