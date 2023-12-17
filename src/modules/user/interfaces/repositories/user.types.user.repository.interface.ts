import { UserTypesUser } from '../../entities/user.types.user.entity';

export const USER_TYPES_USER_REPOSITORY = 'USER_TYPES_USER_REPOSITORY';

export interface UserTypesUserRepositoryInterface {
  save(props: Partial<UserTypesUser>): Promise<UserTypesUser>;
  createUserProvider(props: Partial<UserTypesUser>): Promise<UserTypesUser>;
  findTypesUserById(id: string): Promise<UserTypesUser[]>;
}
