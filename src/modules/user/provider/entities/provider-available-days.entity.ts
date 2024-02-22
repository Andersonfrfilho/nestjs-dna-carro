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

@Entity('providers_availabilities_days')
export class ProviderAvailableDay {
  @PrimaryGeneratedColumn()
  id: string;

  @Exclude()
  @Column({ name: 'provider_id' })
  providerId: string;

  @Column()
  day: string;

  @Exclude()
  @ManyToOne(() => Provider, (provider) => provider.providerAvailableDays)
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  provider?: Provider;

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
