import { ClientCacheCreateServiceParamsDTO } from '../dto/client.service.dto';

export enum KEY_CACHE {
  user = 'user',
  address = 'address',
  phone = 'phone',
}
export interface ClientCreateCacheServiceInterface {
  execute(params: ClientCacheCreateServiceParamsDTO): Promise<void>;
}
