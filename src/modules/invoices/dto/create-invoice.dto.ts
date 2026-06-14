import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty({
    description: 'Service order ID to create invoice for',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsUUID()
  serviceOrderId: string;

  @ApiProperty({
    description: 'Tax rate percentage (0-100)',
    example: 8.5,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  taxRate?: number;

  @ApiProperty({
    description: 'Discount amount',
    example: 25.00,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  discountAmount?: number;
}