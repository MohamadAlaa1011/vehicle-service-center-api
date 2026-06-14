import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { TransactionType } from '../../../common/enums/transaction-type.enum';

export class AdjustStockDto {
  @ApiProperty({
    description: 'Type of inventory adjustment',
    enum: TransactionType,
    example: TransactionType.ADJUSTMENT,
  })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({
    description: 'Quantity to adjust (positive for increase, negative for decrease)',
    example: 10,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Reason for the adjustment',
    example: 'Stock count correction',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  reason?: string;
}