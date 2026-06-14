import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Full name of the customer',
    example: 'John Doe',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  fullName: string;

  @ApiProperty({
    description: 'Phone number of the customer',
    example: '+1234567890',
  })
  @IsString()
  @Matches(/^\+?[\d\s-()]{10,20}$/, {
    message: 'Phone number must be valid',
  })
  phone: string;

  @ApiProperty({
    description: 'Email address of the customer',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Address of the customer',
    example: '123 Main Street, City, State 12345',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  address?: string;

  @ApiProperty({
    description: 'Additional notes about the customer',
    example: 'Regular customer, prefers morning appointments',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}