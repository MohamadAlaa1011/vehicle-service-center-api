import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsUUID,
  Min,
  Max,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { FuelType } from '../../../common/enums/fuel-type.enum';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Customer ID who owns this vehicle',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  @IsUUID()
  customerId: string;

  @ApiProperty({
    description: 'Vehicle manufacturer/make',
    example: 'Toyota',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  make: string;

  @ApiProperty({
    description: 'Vehicle model',
    example: 'Camry',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  model: string;

  @ApiProperty({
    description: 'Manufacturing year',
    example: 2020,
    minimum: 1900,
    maximum: 2030,
  })
  @IsNumber()
  @Min(1900)
  @Max(2030)
  year: number;

  @ApiProperty({
    description: 'Vehicle color',
    example: 'Silver',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  color?: string;

  @ApiProperty({
    description: 'License plate number',
    example: 'ABC123',
  })
  @IsString()
  @Matches(/^[A-Z0-9-]{2,20}$/i, {
    message: 'Plate number must contain only letters, numbers, and hyphens',
  })
  plateNumber: string;

  @ApiProperty({
    description: 'Vehicle Identification Number (VIN)',
    example: '1HGCM82633A123456',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/i, {
    message: 'VIN must be exactly 17 characters (excluding I, O, Q)',
  })
  vinNumber?: string;

  @ApiProperty({
    description: 'Current mileage/odometer reading',
    example: 45000,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  mileage?: number;

  @ApiProperty({
    description: 'Fuel type of the vehicle',
    enum: FuelType,
    example: FuelType.GASOLINE,
    required: false,
  })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;
}