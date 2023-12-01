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
import { Phone } from '../../../modules/phone/phone.entity';

@Entity('users_phones')
export class UserPhone {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'phone_id' })
  phoneId: string;

  @ManyToOne(() => Phone, (phone) => phone.userPhones)
  @JoinColumn({ name: 'phone_id', referencedColumnName: 'id' })
  phone?: Phone;

  @ManyToOne(() => User, (user) => user.userPhones)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @Column()
  active: boolean;

  @Column()
  confirm: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
