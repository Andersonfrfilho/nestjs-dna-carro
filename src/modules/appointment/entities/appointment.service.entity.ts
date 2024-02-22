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
import { Service } from '../../user/provider/entities/services.entity';
import { Exclude } from 'class-transformer';

@Entity('appointments_services')
export class AppointmentService {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'appointment_id' })
  appointmentId: string;

  @Column({ name: 'service_id' })
  serviceId: string;

  @Column()
  amount: number;

  @Column('jsonb', { nullable: false, default: {} })
  details: string;

  @ManyToOne(() => Service, (service) => service.appointmentServices)
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id' })
  service?: Service;

  @ManyToOne(() => Appointment, (appointment) => appointment.appointmentService)
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
