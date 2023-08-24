import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
