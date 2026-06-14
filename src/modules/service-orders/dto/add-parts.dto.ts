import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsPositive, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ServicePartDto {
  @ApiProperty({
    description: 'Spare part ID',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d482',
  })
  @IsUUID()
  partId: string;

  @ApiProperty({
    description: 'Quantity of parts used',
    example: 2,
  })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    description: 'Unit price charged to customer (optional, defaults to part selling price)',
    example: 45.99,
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  unitPrice?: number;
}

export class AddPartsDto {
  @ApiProperty({
    description: 'List of parts used in the service order',
    type: [ServicePartDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServicePartDto)
  parts: ServicePartDto[];
}