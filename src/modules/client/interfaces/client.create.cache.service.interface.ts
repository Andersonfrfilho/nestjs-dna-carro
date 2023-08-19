import { ClientCacheCreateServiceParamsDto } from '../dto/client.service.dto';

export enum KEY_CACHE {
  user = 'user',
  address = 'address',
  phone = 'phone',
}
export interface ClientCreateCacheServiceInterface {
  execute(params: ClientCacheCreateServiceParamsDto): Promise<void>;
}
