import { User } from '@modules/user/entities/user.entity';
import { UserFindByPhoneParamsDto } from '../../dto/user.repository.dto';
import { UserPhone } from '../../entities/user.phone.entity';
import {
  FindByPhoneActiveUserParamsDto,
  UpdatePasswordByEmailParamsDto,
} from '../../dto/user.dto';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepositoryInterface {
  save(props: Partial<User>): Promise<User>;
  findByCpf(cpfParam: string): Promise<User | null>;
  findByEmail(emailParam: string): Promise<User | null>;
  findByPhoneActiveUser(
    phone: FindByPhoneActiveUserParamsDto,
  ): Promise<User | null>;
  findByPhone(
    phoneParams: UserFindByPhoneParamsDto,
  ): Promise<UserPhone[] | null>;
  findByEmailActive(emailParam: string): Promise<User | null>;
  findByIdActive(id: string): Promise<User | null>;
  findUserByPhoneActiveUserActive(
    phoneParams: UserFindByPhoneParamsDto,
  ): Promise<User | null>;
  inactiveUserByEmail(emailParam: string): Promise<void>;
  updatePasswordByEmailUserActive(
    data: UpdatePasswordByEmailParamsDto,
  ): Promise<void>;
}
