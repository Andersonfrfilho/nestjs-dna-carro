import { UserProviderCreateServiceParamsDto } from '../dtos/user.provider.create.dto';

export const USER_PROVIDER_CREATE_SERVICE = 'USER_PROVIDER_CREATE_SERVICE';

export interface UserProviderCreateServiceInterface {
  execute(params: UserProviderCreateServiceParamsDto): Promise<void>;
}
