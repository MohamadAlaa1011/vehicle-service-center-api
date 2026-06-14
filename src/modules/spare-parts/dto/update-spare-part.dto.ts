import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateSparePartDto } from './create-spare-part.dto';

// Omit quantity from updates as it should be managed through inventory transactions
export class UpdateSparePartDto extends PartialType(
  OmitType(CreateSparePartDto, ['quantity'] as const),
) {}