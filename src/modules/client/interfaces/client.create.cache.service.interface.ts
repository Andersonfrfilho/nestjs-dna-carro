import { ClientCacheCreateServiceParamsDto } from '../dto/client.service.dto';

export interface ClientCreateCacheServiceInterface {
  execute(params: ClientCacheCreateServiceParamsDto): Promise<void>;
}
