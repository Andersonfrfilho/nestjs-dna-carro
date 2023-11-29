import { FindAddressByCepResultDto } from './addresses.dto';

export const ADDRESSES_PROVIDER = 'ADDRESSES_PROVIDER';
export interface AddressesProviderInterface {
  findAddressByCep(data: string): Promise<FindAddressByCepResultDto>;
}
