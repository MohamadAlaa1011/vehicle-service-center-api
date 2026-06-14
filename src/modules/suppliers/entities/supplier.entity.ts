import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { SparePart } from '../../spare-parts/entities/spare-part.entity';

@Entity('suppliers')
export class Supplier extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  companyName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contactPerson?: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  // Relations
  @OneToMany(() => SparePart, (sparePart) => sparePart.supplier)
  spareParts?: SparePart[];
}