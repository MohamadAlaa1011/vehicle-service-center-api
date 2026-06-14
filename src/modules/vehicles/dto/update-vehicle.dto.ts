import { ApiPropertyOptional, PartialType, OmitType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';

// Omit customerId from updates as vehicles shouldn't change ownership easily
export class UpdateVehicleDto extends PartialType(
  OmitType(CreateVehicleDto, ['customerId'] as const),
) {}