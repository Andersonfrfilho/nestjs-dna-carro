import { UserToken } from '../../entities/user.token.entity';

export const USER_TOKEN_REPOSITORY = 'USER_TOKEN_REPOSITORY';

export interface UserTokenRepositoryInterface {
  save(props: Partial<UserToken>): Promise<UserToken>;
}
