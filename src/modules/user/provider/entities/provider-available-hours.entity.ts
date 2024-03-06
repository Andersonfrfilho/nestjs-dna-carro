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
import { Exclude } from 'class-transformer';

@Entity('providers_availabilities_hours')
export class ProviderAvailableHour {
  @PrimaryGeneratedColumn()
  id: string;

  @Exclude()
  @Column({ name: 'provider_id' })
  providerId: string;

  @Exclude()
  @ManyToOne(() => Provider, (provider) => provider.providerAvailableHours)
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  provider?: Provider;

  @Column({ name: 'start' })
  start: string;

  @Column({ name: 'end' })
  end: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
