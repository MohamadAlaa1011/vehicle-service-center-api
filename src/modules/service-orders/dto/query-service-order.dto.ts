import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsUUID, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { ServiceOrderStatus } from '../../../common/enums/service-order-status.enum';
import { ServiceOrderPriority } from '../../../common/enums/service-order-priority.enum';

export class QueryServiceOrderDto extends PaginationDto {
  @ApiProperty({
    description: 'Filter by customer ID',
    required: false,
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @ApiProperty({
    description: 'Filter by vehicle ID',
    required: false,
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
  })
  @IsOptional()
  @IsUUID()
  vehicleId?: string;

  @ApiProperty({
    description: 'Filter by assigned mechanic ID',
    required: false,
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
  })
  @IsOptional()
  @IsUUID()
  mechanicId?: string;

  @ApiProperty({
    description: 'Filter by service order status',
    enum: ServiceOrderStatus,
    required: false,
    example: ServiceOrderStatus.IN_PROGRESS,
  })
  @IsOptional()
  @IsEnum(ServiceOrderStatus)
  status?: ServiceOrderStatus;

  @ApiProperty({
    description: 'Filter by priority level',
    enum: ServiceOrderPriority,
    required: false,
    example: ServiceOrderPriority.HIGH,
  })
  @IsOptional()
  @IsEnum(ServiceOrderPriority)
  priority?: ServiceOrderPriority;

  @ApiProperty({
    description: 'Search by order number or issue description',
    required: false,
    example: 'brake',
  })
  @IsOptional()
  @IsString()
  declare search?: string;
}