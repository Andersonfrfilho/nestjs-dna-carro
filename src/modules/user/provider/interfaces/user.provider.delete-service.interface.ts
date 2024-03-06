import { UserProviderDeleteServiceServiceParamsDto } from '../dtos/user.provier-delete-services.dto';
import {} from '../dtos/user.provier-get-services.dto';

export const USER_PROVIDER_DELETE_SERVICE_SERVICE =
  'USER_PROVIDER_DELETE_SERVICE_SERVICE';

export interface UserProviderDeleteServiceServiceInterface {
  execute(params: UserProviderDeleteServiceServiceParamsDto): Promise<void>;
}
