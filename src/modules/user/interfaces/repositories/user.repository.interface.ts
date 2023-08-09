import { User } from '@modules/user/entities/user.entity';
import { UserFindByPhoneParamsDTO } from '../../dto/user.repository.dto';
import { UserPhone } from '../../entities/user.phone.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepositoryInterface {
  save(props: Partial<User>): Promise<User>;
  findByCpf(cpfParam: string): Promise<User | null>;
  findByEmail(emailParam: string): Promise<User | null>;
  findByPhone(
    phoneParams: UserFindByPhoneParamsDTO,
  ): Promise<UserPhone[] | null>;
}
