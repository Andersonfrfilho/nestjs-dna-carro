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
import { AppointmentEvents } from './appointment.events.entity';
import { Exclude } from 'class-transformer';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'initial_date' })
  initialDate: string;

  @Column({ name: 'final_date' })
  finalDate: string;

  @Column()
  confirm: boolean;

  @Column()
  duration: number;

  @Column()
  status: string;

  @Column('jsonb', { nullable: false, default: {} })
  details: string;

  @OneToMany(
    () => AppointmentEvents,
    (appointmentEvents) => appointmentEvents.appointment,
  )
  events?: AppointmentEvents[];

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
