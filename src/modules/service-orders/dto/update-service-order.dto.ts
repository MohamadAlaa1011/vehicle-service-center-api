import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { CreateServiceOrderDto } from './create-service-order.dto';
import { ServiceOrderStatus } from '../../../common/enums/service-order-status.enum';
import { ServiceOrderPriority } from '../../../common/enums/service-order-priority.enum';

export class UpdateServiceOrderDto extends PartialType(CreateServiceOrderDto) {
  @ApiProperty({
    description: 'Mechanic diagnosis of the issue',
    example: 'Worn brake pads causing squealing noise',
    required: false,
  })
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @ApiProperty({
    description: 'Current status of the service order',
    enum: ServiceOrderStatus,
    example: ServiceOrderStatus.IN_PROGRESS,
    required: false,
  })
  @IsOptional()
  @IsEnum(ServiceOrderStatus)
  status?: ServiceOrderStatus;

  @ApiProperty({
    description: 'Labor cost for the service',
    example: 200.00,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  laborCost?: number;

  @ApiProperty({
    description: 'Priority level of the service order',
    enum: ServiceOrderPriority,
    example: ServiceOrderPriority.HIGH,
    required: false,
  })
  @IsOptional()
  @IsEnum(ServiceOrderPriority)
  priority?: ServiceOrderPriority;

  @ApiProperty({
    description: 'Actual completion date',
    example: '2026-06-16T15:30:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  completionDate?: string;
}