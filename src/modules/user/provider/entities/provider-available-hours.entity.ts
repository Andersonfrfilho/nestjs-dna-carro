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

@Entity('providers_availabilities_hours')
export class ProviderAvailableHour {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'provider_id' })
  providerId: string;

  @ManyToOne(() => Provider, (provider) => provider.providerAvailableHours)
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  provider?: Provider;

  @Column({ name: 'start' })
  start: string;

  @Column({ name: 'end' })
  end: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
