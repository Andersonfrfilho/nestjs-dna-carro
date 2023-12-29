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
import { Provider } from './provider.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'provider_id' })
  providerId: string;

  @ManyToOne(() => Provider, (provider) => provider.providerAvailableHours)
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  provider?: Provider;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  duration: number;

  @Column('jsonb', { nullable: false, default: {} })
  details: string;

  @Column()
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
