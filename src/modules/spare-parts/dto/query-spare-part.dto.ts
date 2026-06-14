import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class QuerySparePartDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by category',
    example: 'Brakes',
  })
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({
    description: 'Filter by supplier ID',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  supplierId?: string;

  @ApiPropertyOptional({
    description: 'Show only parts with low stock (below minimum stock level)',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  lowStock?: boolean;
}