import { ClientCacheCreateServiceParamsDTO } from '../dto/client.service.dto';

export interface ClientCreateCacheServiceInterface {
  execute(params: ClientCacheCreateServiceParamsDTO): Promise<void>;
}
