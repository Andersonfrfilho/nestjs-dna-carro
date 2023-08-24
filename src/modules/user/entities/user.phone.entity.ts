import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Phone } from '@src/modules/phone/phone.entity';

@Entity('users_phones')
export class UserPhone {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'phone_id' })
  phoneId: string;

  @Column()
  active: boolean;

  @Column()
  confirm: boolean;

  @ManyToOne(() => User, (user) => user.usersPhones)
  public user: User;

  @ManyToOne(() => Phone, (phone) => phone.usersPhones)
  public phone: Phone;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
