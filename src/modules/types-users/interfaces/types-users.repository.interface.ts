import { TypesUser } from '../types-users.entity';

export const TYPES_USER_REPOSITORY = 'TYPES_USER_REPOSITORY';

export interface TypesUserRepositoryInterface {
  save(props: Partial<TypesUser>): Promise<TypesUser>;
  findByName(name: string): Promise<TypesUser | null>;
}
