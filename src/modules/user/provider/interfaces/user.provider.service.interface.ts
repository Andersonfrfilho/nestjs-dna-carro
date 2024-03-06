import { UserProviderServiceDisableServiceParamsDto } from '../dtos/user.provider.disable-service.dto';
import { UserProviderCreateServiceServiceParamsDto } from '../dtos/user.provider.service.dto';
import { Service } from '../entities/services.entity';

export const USER_PROVIDER_CREATE_SERVICE_SERVICE =
  'USER_PROVIDER_CREATE_SERVICE_SERVICE';

export interface UserProviderCreateServiceServiceInterface {
  execute(params: UserProviderCreateServiceServiceParamsDto): Promise<Service>;
}

export const USER_PROVIDER_DISABLE_SERVICE_SERVICE =
  'USER_PROVIDER_DISABLE_SERVICE_SERVICE';

export interface UserProviderDisableServiceServiceInterface {
  execute(params: UserProviderServiceDisableServiceParamsDto): Promise<void>;
}
