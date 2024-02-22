import { Address } from '../../address/address.entity';
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

@Entity('appointments_addresses')
export class AppointmentAddress {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'appointment_id' })
  appointmentId: string;

  @Column({ name: 'address_id' })
  addressId: string;

  @ManyToOne(() => Address, (address) => address.appointmentAddresses)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address?: Address;

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
