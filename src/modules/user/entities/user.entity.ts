import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  // JoinTable,
} from 'typeorm';
import { Phone } from '@src/modules/phone/phone.entity';
import { UserPhone } from './user.phone.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  document: string;

  @Column({ name: 'document_type' })
  documentType: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  gender: string;

  @Column('jsonb', { nullable: false, default: {} })
  details: string;

  @Column({ name: 'birth_date' })
  birthDate: number;

  @Column()
  active: boolean;

  @OneToMany(() => UserPhone, (userPhone) => userPhone.user)
  userPhone?: UserPhone[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
