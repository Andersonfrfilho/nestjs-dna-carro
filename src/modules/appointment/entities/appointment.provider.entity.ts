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
import { Provider } from '../../user/provider/entities/provider.entity';
import { Exclude } from 'class-transformer';
import { Client } from '../../../modules/user/client/entities/client.entity';

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

  @Column()
  status: string;

  @ManyToOne(() => Provider, (provider) => provider.appointmentProviders)
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  provider?: Client;

  @ManyToOne(
    () => Appointment,
    (appointment) => appointment.appointmentAddresses,
  )
  @JoinColumn({ name: 'appointment_id', referencedColumnName: 'id' })
  appointment?: Appointment;

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
