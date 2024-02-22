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
import { Exclude } from 'class-transformer';
import { Client } from '../../../modules/user/client/entities/client.entity';

@Entity('appointments_clients')
export class AppointmentClient {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'appointment_id' })
  appointmentId: string;

  @Column({ name: 'client_id' })
  clientId: string;

  @Column()
  active: boolean;

  @ManyToOne(() => Client, (client) => client.appointmentClients)
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client?: Client;

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
