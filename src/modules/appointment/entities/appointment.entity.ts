import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { AppointmentAddress } from './appointment.address.entity';
import { AppointmentClient } from './appointment.client.entity';
import { AppointmentPaymentTypes } from './appointment.payment-type.entity';
import { AppointmentProvider } from './appointment.provider.entity';
import { AppointmentService } from './appointment.service.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'initial_date' })
  initialDate: string;

  @Column({ name: 'initial_date' })
  finalDate: string;

  @Column()
  confirm: boolean;

  @Column()
  duration: number;

  @Column('jsonb', { nullable: false, default: {} })
  details: string;

  @OneToMany(
    () => AppointmentAddress,
    (appointmentAddress) => appointmentAddress.appointment,
  )
  appointmentAddresses?: AppointmentAddress[];

  @OneToMany(
    () => AppointmentClient,
    (appointmentClient) => appointmentClient.appointment,
  )
  appointmentClients?: AppointmentClient[];

  @OneToMany(
    () => AppointmentPaymentTypes,
    (appointmentPaymentType) => appointmentPaymentType.appointment,
  )
  appointmentPaymentType?: AppointmentPaymentTypes[];

  @OneToMany(
    () => AppointmentProvider,
    (appointmentProvider) => appointmentProvider.appointment,
  )
  appointmentProvider?: AppointmentProvider[];

  @OneToMany(
    () => AppointmentService,
    (appointmentService) => appointmentService.appointment,
  )
  appointmentService?: AppointmentService[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
