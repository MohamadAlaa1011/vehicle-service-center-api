import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mechanic } from './entities/mechanic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mechanic])],
  controllers: [],
  providers: [],
  exports: [],
})
export class MechanicsModule {}