import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { ProviderPaymentsTypes } from '../user/provider/entities/provider-payment-types.entity';

@Entity('payments_types')
export class PaymentType {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  name: string;

  @Column()
  active: boolean;

  @Column('jsonb', { nullable: false, default: {} })
  description: string;

  @OneToMany(
    () => ProviderPaymentsTypes,
    (providerPaymentsTypes) => providerPaymentsTypes.paymentType,
  )
  typePaymentProviderPaymentsTypes?: ProviderPaymentsTypes[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
