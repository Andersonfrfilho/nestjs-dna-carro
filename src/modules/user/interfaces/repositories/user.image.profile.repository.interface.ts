import { UserImageProfile } from '../../entities/user.image.profile.entity';

export const USER_IMAGE_PROFILE_REPOSITORY = 'USER_IMAGE_PROFILE_REPOSITORY';

export interface UserImageProfileRepositoryInterface {
  save(props: Partial<UserImageProfile>): Promise<UserImageProfile>;
}
