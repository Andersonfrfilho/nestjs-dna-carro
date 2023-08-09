import { UserAddress } from '../../entities/user.address.entity';

export const USER_ADDRESS_REPOSITORY = 'USER_ADDRESS_REPOSITORY';

export interface UserAddressRepositoryInterface {
  save(props: Partial<UserAddress>): Promise<UserAddress>;
}
