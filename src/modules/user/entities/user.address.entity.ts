import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Address } from '../../../modules/address/address.entity';

@Entity('users_addresses')
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'address_id' })
  addressId: string;

  @Column()
  active: boolean;

  @ManyToOne(() => Address, (address) => address.userAddresses)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address?: Address;

  @ManyToOne(() => User, (user) => user.userAddresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
