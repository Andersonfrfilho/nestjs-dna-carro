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
import { AppointmentPaymentTypes } from '../appointment/entities/appointment.payment-type.entity';

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

  @OneToMany(
    () => AppointmentPaymentTypes,
    (appointmentPaymentsTypes) => appointmentPaymentsTypes.paymentType,
  )
  appointmentPaymentsTypes?: AppointmentPaymentTypes[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
