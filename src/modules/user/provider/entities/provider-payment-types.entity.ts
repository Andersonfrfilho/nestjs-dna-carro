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
import { PaymentType } from '../../../payments-types/payments-types.entity';

@Entity('providers_payments_types')
export class ProviderPaymentsTypes {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'provider_id' })
  providerId: string;

  @Column({ name: 'payment_type_id' })
  paymentTypeId: string;

  @ManyToOne(() => Provider, (provider) => provider.paymentsAvailable)
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  provider?: Provider;

  @ManyToOne(
    () => PaymentType,
    (paymentType) => paymentType.typePaymentProviderPaymentsTypes,
  )
  @JoinColumn({ name: 'payment_type_id', referencedColumnName: 'id' })
  paymentType?: PaymentType;

  @Column()
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
