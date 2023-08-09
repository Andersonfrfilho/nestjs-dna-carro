import { Address } from '@modules/address/address.entity';

export const ADDRESS_REPOSITORY = 'ADDRESS_REPOSITORY';

export interface AddressRepositoryInterface {
  save(props: Partial<Address>): Promise<Address>;
}
