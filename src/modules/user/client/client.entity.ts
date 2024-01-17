import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { AppointmentClient } from '@src/modules/appointment/entities/appointment.client.entity';

@Entity('users')
export class Client {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  document: string;

  @Column({ name: 'document_type' })
  documentType: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @OneToMany(
    () => AppointmentClient,
    (appointmentClient) => appointmentClient.client,
  )
  appointmentClients?: AppointmentClient[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
