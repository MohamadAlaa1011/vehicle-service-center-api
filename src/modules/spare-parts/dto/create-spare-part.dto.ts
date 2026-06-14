import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUUID,
  IsOptional,
  Min,
  Max,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateSparePartDto {
  @ApiProperty({
    description: 'Stock Keeping Unit (SKU) - unique identifier',
    example: 'BP001',
  })
  @IsString()
  @Matches(/^[A-Z0-9-]{3,20}$/i, {
    message: 'SKU must contain only letters, numbers, and hyphens (3-20 characters)',
  })
  sku: string;

  @ApiProperty({
    description: 'Name of the spare part',
    example: 'Brake Pads - Front',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Category of the spare part',
    example: 'Brakes',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  category: string;

  @ApiProperty({
    description: 'Detailed description of the spare part',
    example: 'Premium ceramic brake pads for front wheels',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    description: 'Current quantity in stock',
    example: 50,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({
    description: 'Minimum stock level for alerts',
    example: 10,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  minimumStock: number;

  @ApiProperty({
    description: 'Purchase price from supplier',
    example: 45.99,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  purchasePrice: number;

  @ApiProperty({
    description: 'Selling price to customers',
    example: 69.99,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  sellingPrice: number;

  @ApiProperty({
    description: 'Supplier ID',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  @IsUUID()
  supplierId: string;
}