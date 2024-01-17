import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserAddress } from '../user/entities/user.address.entity';
import { AppointmentAddress } from '../appointment/entities/appointment.address.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  zipcode: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  longitude: string;

  @Column()
  latitude: string;

  @Column()
  complement: string;

  @Column()
  reference: string;

  @Column('jsonb', { nullable: false, default: {} })
  details: string;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.address)
  userAddresses?: UserAddress[];

  @OneToMany(
    () => AppointmentAddress,
    (appointmentAddress) => appointmentAddress.address,
  )
  appointmentAddresses?: AppointmentAddress[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
