import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../../common/base/base.entity';
import { UserStatus } from '../../../common/enums/user-status.enum';
import { User } from '../../users/entities/user.entity';
import { ServiceOrder } from '../../service-orders/entities/service-order.entity';

@Entity('mechanics')
export class Mechanic extends BaseEntity {
  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  specialization?: string;

  @Column({ type: 'date' })
  hireDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @Exclude({ toPlainOnly: true })
  salary?: number;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  // Relations
  @OneToOne(() => User, (user) => user.mechanic)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.assignedMechanic)
  assignedServiceOrders?: ServiceOrder[];
}