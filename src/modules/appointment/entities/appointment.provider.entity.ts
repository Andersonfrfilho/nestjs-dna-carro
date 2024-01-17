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
import { Client } from '@src/modules/user/client/client.entity';
import { Provider } from '@src/modules/user/provider/entities/provider.entity';

@Entity('appointments_providers')
export class AppointmentProvider {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'appointment_id' })
  appointmentId: string;

  @Column({ name: 'provider_id' })
  providerId: string;

  @Column()
  active: boolean;

  @ManyToOne(() => Provider, (provider) => provider.appointmentProviders)
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  provider?: Client;

  @ManyToOne(
    () => Appointment,
    (appointment) => appointment.appointmentAddresses,
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
