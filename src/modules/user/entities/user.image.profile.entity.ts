import { Image } from '../../../modules/image/image.entity';
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
import { User } from './user.entity';

@Entity('users_profiles_images')
export class UserImageProfile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'image_id' })
  userImageProfileId: string;

  @ManyToOne(() => Image, (image) => image.userImagesProfiles)
  @JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
  imageProfile?: Image;

  @ManyToOne(() => User, (user) => user.userImageProfiles)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
