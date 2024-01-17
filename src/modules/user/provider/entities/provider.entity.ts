import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  // JoinTable,
} from 'typeorm';
import { UserPhone } from '../../entities/user.phone.entity';
import { UserAddress } from '../../entities/user.address.entity';
import { UserImageProfile } from '../../entities/user.image.profile.entity';
import { UserTerm } from '../../entities/user.term.entity';
import { UserTypesUser } from '../../entities/user.types.user.entity';
import { ProviderAvailableDay } from './provider-available-days.entity';
import { ProviderAvailableHour } from './provider-available-hours.entity';
import { Service } from './services.entity';
import { ProviderPaymentsTypes } from './provider-payment-types.entity';
import { AppointmentProvider } from '@src/modules/appointment/entities/appointment.provider.entity';

@Entity('users')
export class Provider {
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
  password_hash: string;

  @Column()
  gender: string;

  @Column('jsonb', { nullable: false, default: {} })
  details: string;

  @Column({ name: 'birth_date' })
  birthDate: number;

  @Column()
  active: boolean;

  @OneToMany(() => UserPhone, (userPhone) => userPhone.user)
  userPhones?: UserPhone[];

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  userAddresses?: UserAddress[];

  @OneToMany(
    () => UserImageProfile,
    (userImageProfile) => userImageProfile.user,
  )
  userImageProfiles?: UserImageProfile[];

  @OneToMany(() => UserTerm, (userTerms) => userTerms.user)
  userTerms?: UserTerm[];

  @OneToMany(() => UserTypesUser, (userTypesUser) => userTypesUser.user)
  userTypesUsers?: UserTypesUser[];

  @OneToMany(
    () => ProviderAvailableDay,
    (providerAvailableDay) => providerAvailableDay.provider,
  )
  providerAvailableDays?: ProviderAvailableDay[];

  @OneToMany(
    () => ProviderAvailableHour,
    (providerAvailableHour) => providerAvailableHour.provider,
  )
  providerAvailableHours?: ProviderAvailableHour[];

  @OneToMany(() => Service, (service) => service.provider)
  services?: Service[];

  @OneToMany(
    () => ProviderPaymentsTypes,
    (providerPaymentsTypes) => providerPaymentsTypes.provider,
  )
  paymentsAvailable?: ProviderPaymentsTypes[];

  @OneToMany(
    () => AppointmentProvider,
    (appointmentProvider) => appointmentProvider.provider,
  )
  appointmentProviders?: AppointmentProvider[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
