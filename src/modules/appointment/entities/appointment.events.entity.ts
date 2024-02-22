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

@Entity('appointments_events')
export class AppointmentEvents {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'appointment_id' })
  appointmentId: string;

  @ManyToOne(() => Appointment, (appointment) => appointment.events)
  @JoinColumn({ name: 'appointment_id', referencedColumnName: 'id' })
  appointment?: Appointment;

  @Column()
  status: string;

  @Column()
  participant: string;

  @Column('jsonb', { nullable: false, default: {} })
  details: string;

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
