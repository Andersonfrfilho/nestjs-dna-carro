import { UserPhone } from '../../entities/user.phone.entity';

export const USER_PHONE_REPOSITORY = 'USER_PHONE_REPOSITORY';

export interface UserPhoneRepositoryInterface {
  save(props: Partial<UserPhone>): Promise<UserPhone>;
}
