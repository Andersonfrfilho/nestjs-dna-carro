import { UserProviderInternalDisableServiceParamsDto } from '../dtos/user.provider.internal-disable.dto';

export const USER_PROVIDER_INTERNAL_DISABLE_SERVICE =
  'USER_PROVIDER_INTERNAL_DISABLE_SERVICE';

export interface UserProviderInternalDisableServiceInterface {
  execute(params: UserProviderInternalDisableServiceParamsDto): Promise<void>;
}
