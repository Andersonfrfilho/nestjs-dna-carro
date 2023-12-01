import { ClientCacheCreateServiceParamsDto } from '../dto/client.create.cache.dto';

export interface ClientCreateCacheServiceInterface {
  execute(params: ClientCacheCreateServiceParamsDto): Promise<void>;
}
