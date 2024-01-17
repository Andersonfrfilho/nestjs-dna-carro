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
import { Appointment } from './appointment.entity';
import { PaymentType } from '@src/modules/payments-types/payments-types.entity';

@Entity('appointments_payment_types')
export class AppointmentPaymentTypes {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'appointment_id' })
  appointmentId: string;

  @Column({ name: 'payment_type_id' })
  paymentTypeId: string;

  @Column()
  active: boolean;

  @ManyToOne(
    () => PaymentType,
    (paymentType) => paymentType.appointmentPaymentsTypes,
  )
  @JoinColumn({ name: 'payment_type_id', referencedColumnName: 'id' })
  paymentType?: PaymentType;

  @ManyToOne(
    () => Appointment,
    (appointment) => appointment.appointmentPaymentType,
  )
  @JoinColumn({ name: 'appointment_id', referencedColumnName: 'id' })
  appointment?: Appointment;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
