import { UserTerm } from '../../entities/user.term.entity';

export const USER_TERM_REPOSITORY = 'USER_TERM_REPOSITORY';

export interface UserTermRepositoryInterface {
  save(props: Partial<UserTerm>): Promise<UserTerm>;
}
