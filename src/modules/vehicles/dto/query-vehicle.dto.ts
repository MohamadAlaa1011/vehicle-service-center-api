import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsUUID, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { FuelType } from '../../../common/enums/fuel-type.enum';

export class QueryVehicleDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by customer ID',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @ApiPropertyOptional({
    description: 'Filter by vehicle make',
    example: 'Toyota',
  })
  @IsOptional()
  make?: string;

  @ApiPropertyOptional({
    description: 'Filter by manufacturing year',
    example: 2020,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1900)
  @Max(2030)
  year?: number;

  @ApiPropertyOptional({
    description: 'Filter by fuel type',
    enum: FuelType,
  })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;
}