import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ServiceOrderPriority } from '../../../common/enums/service-order-priority.enum';

export class CreateServiceOrderDto {
  @ApiProperty({
    description: 'Customer ID who owns the vehicle',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsUUID()
  customerId: string;

  @ApiProperty({
    description: 'Vehicle ID for the service',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
  })
  @IsUUID()
  vehicleId: string;

  @ApiProperty({
    description: 'Assigned mechanic ID',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  assignedMechanicId?: string;

  @ApiProperty({
    description: 'Description of the issue reported by customer',
    example: 'Engine making strange noise during acceleration',
  })
  @IsString()
  issueDescription: string;

  @ApiProperty({
    description: 'Labor cost for the service',
    example: 150.00,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  laborCost?: number;

  @ApiProperty({
    description: 'Priority level of the service order',
    enum: ServiceOrderPriority,
    example: ServiceOrderPriority.MEDIUM,
    required: false,
  })
  @IsOptional()
  @IsEnum(ServiceOrderPriority)
  priority?: ServiceOrderPriority;

  @ApiProperty({
    description: 'Scheduled start date for the service',
    example: '2026-06-15T09:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;
}