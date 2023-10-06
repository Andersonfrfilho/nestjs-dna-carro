import { Term } from '@src/modules/term/term.entity';
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

@Entity('users_terms')
export class UserTerm {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'term_id' })
  termId: number;

  @Column()
  accept: boolean;

  @Column('jsonb', { nullable: false, default: {} })
  details: string;

  @ManyToOne(() => Term, (term) => term.userTerms)
  @JoinColumn({ name: 'term_id', referencedColumnName: 'id' })
  term?: Term;

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
