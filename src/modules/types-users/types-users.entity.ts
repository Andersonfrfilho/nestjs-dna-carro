import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserTypesUser } from '../user/entities/user.types.user.entity';

@Entity('types_users')
export class TypesUser {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  name: string;

  @Column()
  active: boolean;

  @Column('jsonb', { nullable: false, default: {} })
  description: string;

  @OneToMany(
    () => UserTypesUser,
    (userTypesUser) => userTypesUser.typesUsersTypes,
  )
  typeUserTypes?: UserTypesUser[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
