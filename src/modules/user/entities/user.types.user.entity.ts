import { TypesUser } from '../../../modules/types-users/types-users.entity';
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

@Entity('users_types_users')
export class UserTypesUser {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'user_type_id' })
  userTypeId: number;

  @Column('varchar', { array: true })
  roles?: string[];

  @Column('varchar', { array: true })
  permissions: Array<string>;

  @Column()
  confirm: boolean;

  @Column()
  active: boolean;

  @ManyToOne(() => TypesUser, (typesUser) => typesUser.typeUserTypes)
  @JoinColumn({ name: 'user_type_id', referencedColumnName: 'id' })
  typesUsersTypes?: TypesUser;

  @ManyToOne(() => User, (user) => user.userTerms)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
