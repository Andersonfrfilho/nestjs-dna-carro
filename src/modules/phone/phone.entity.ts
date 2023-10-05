import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserPhone } from '../user/entities/user.phone.entity';

@Entity('phones')
export class Phone {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'country_code' })
  countryCode: string;

  @Column()
  ddd: string;

  @Column()
  number: string;

  @Column()
  active: boolean;

  @OneToMany(() => UserPhone, (userPhone) => userPhone.phone)
  userPhone?: UserPhone[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
