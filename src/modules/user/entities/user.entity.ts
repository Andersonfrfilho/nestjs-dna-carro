import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
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
  cpf: string;

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
  public usersPhones: UserPhone[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
