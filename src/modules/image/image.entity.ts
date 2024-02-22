import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserImageProfile } from '../user/entities/user.image.profile.entity';
import { UserClientImageProfile } from '../user/client/entities/client.images-profiles.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @OneToMany(
    () => UserImageProfile,
    (userImageProfile) => userImageProfile.imageProfile,
  )
  userImagesProfiles?: UserImageProfile[];

  @OneToMany(
    () => UserClientImageProfile,
    (userClientImageProfile) => userClientImageProfile.imageProfile,
  )
  userClientImagesProfiles?: UserClientImageProfile[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
