import { BaseEntity } from '../../../common/base/base.entity';
import { SparePart } from '../../spare-parts/entities/spare-part.entity';
export declare class Supplier extends BaseEntity {
    companyName: string;
    contactPerson?: string;
    phone: string;
    email?: string;
    address?: string;
    spareParts?: SparePart[];
}
