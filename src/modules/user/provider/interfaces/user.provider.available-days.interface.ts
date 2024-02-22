import {
  UserProviderCreateAvailableDaysControllerResultDto,
  UserProviderCreateAvailableDaysServiceParamsDto,
  UserProviderGetAvailableDaysServiceParamsDto,
  UserProviderGetAvailableDaysServiceResultDto,
} from '../dtos/user.provider.available-days.dto';
import { ProviderAvailableDay } from '../entities/provider-available-days.entity';

export const USER_PROVIDER_AVAILABLE_DAYS_REPOSITORY =
  'USER_PROVIDER_AVAILABLE_DAYS_REPOSITORY';

export interface UserProviderAvailableDaysRepositoryInterface {
  save(props: Partial<ProviderAvailableDay>): Promise<ProviderAvailableDay>;
  findByUserProviderId(providerId: string): Promise<ProviderAvailableDay[]>;
  delete(providerId: string | string[]): Promise<void>;
  updateDeleteAt(id: string): Promise<void>;
}

export const USER_PROVIDER_CREATE_AVAILABLE_DAYS_SERVICE =
  'USER_PROVIDER_CREATE_AVAILABLE_DAYS_SERVICE';

export interface UserProviderCreateAvailableDaysServiceInterface {
  execute(
    params: UserProviderCreateAvailableDaysServiceParamsDto,
  ): Promise<UserProviderCreateAvailableDaysControllerResultDto[]>;
}

export const USER_PROVIDER_GET_AVAILABLE_DAYS_SERVICE =
  'USER_PROVIDER_GET_AVAILABLE_DAYS_SERVICE';

export interface UserProviderGetAvailableDaysServiceInterface {
  execute(
    params: UserProviderGetAvailableDaysServiceParamsDto,
  ): Promise<UserProviderGetAvailableDaysServiceResultDto[]>;
}
