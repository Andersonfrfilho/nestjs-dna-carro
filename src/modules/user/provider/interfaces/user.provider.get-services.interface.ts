import {
  UserProviderGetServicesServiceParamsDto,
  UserProviderGetServicesServiceResultDto,
} from '../dtos/user.provier-get-services.dto';

export const USER_PROVIDER_GET_SERVICES_SERVICE =
  'USER_PROVIDER_GET_SERVICES_SERVICE';

export interface UserProviderGetServicesServiceInterface {
  execute(
    params: UserProviderGetServicesServiceParamsDto,
  ): Promise<UserProviderGetServicesServiceResultDto>;
}
