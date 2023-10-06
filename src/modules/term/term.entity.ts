import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserTerm } from '../user/entities/user.term.entity';

@Entity('terms')
export class Term {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  version: string;

  @Column('jsonb', { nullable: false, default: {} })
  description: string;

  @Column()
  active: boolean;

  @OneToMany(() => UserTerm, (userTerm) => userTerm.term)
  userTerms?: UserTerm[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
