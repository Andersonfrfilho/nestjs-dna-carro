import {
  UserProviderCreateAvailabilitiesHoursServiceParamsDto,
  UserProviderCreateAvailabilitiesHoursServiceResultDto,
  UserProviderGetAvailabilitiesHoursServiceParamsDto,
  UserProviderGetAvailabilitiesHoursServiceResultDto,
} from '../dtos/user.provider.availabilities-hours.dto';
import { ProviderAvailableHour } from '../entities/provider-available-hours.entity';

export const USER_PROVIDER_AVAILABLE_HOURS_REPOSITORY =
  'USER_PROVIDER_AVAILABLE_HOURS_REPOSITORY';

export interface UserProviderAvailableHoursRepositoryInterface {
  save(props: Partial<ProviderAvailableHour>): Promise<ProviderAvailableHour>;
  findByUserProviderId(providerId: string): Promise<ProviderAvailableHour[]>;
  delete(hourId: string[] | string): Promise<void>;
  updateDeleteAt(id: string): Promise<void>;
}

export const USER_PROVIDER_CREATE_AVAILABILITIES_HOURS_SERVICE =
  'USER_PROVIDER_CREATE_AVAILABILITIES_HOURS_SERVICE';

export interface UserProviderCreateAvailabilitiesHoursServiceInterface {
  execute(
    params: UserProviderCreateAvailabilitiesHoursServiceParamsDto,
  ): Promise<UserProviderCreateAvailabilitiesHoursServiceResultDto[]>;
}

export const USER_PROVIDER_GET_AVAILABILITIES_HOURS_SERVICE =
  'USER_PROVIDER_GET_AVAILABILITIES_HOURS_SERVICE';

export interface UserProviderGetAvailabilitiesHoursServiceInterface {
  execute(
    params: UserProviderGetAvailabilitiesHoursServiceParamsDto,
  ): Promise<UserProviderGetAvailabilitiesHoursServiceResultDto[]>;
}
