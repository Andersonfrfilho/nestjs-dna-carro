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
import { UserPhone } from './user.phone.entity';
import { UserAddress } from './user.address.entity';
import { UserImageProfile } from './user.image.profile.entity';
import { UserTerm } from './user.term.entity';
import { UserTypesUser } from './user.types.user.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
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

  @Exclude()
  @Column({ name: 'password_hash' })
  passwordHash: string;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
