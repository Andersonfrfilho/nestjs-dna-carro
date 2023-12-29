import { UserProviderHoursAvailableServiceParamsDto } from '../dtos/user.provider.hours-available.dto';
import { ProviderAvailableHour } from '../entities/provider-available-hours.entity';

export const USER_PROVIDER_AVAILABLE_HOURS_REPOSITORY =
  'USER_PROVIDER_AVAILABLE_HOURS_REPOSITORY';

export interface UserProviderAvailableHoursRepositoryInterface {
  save(props: Partial<ProviderAvailableHour>): Promise<ProviderAvailableHour>;
  findByUserProviderId(providerId: string): Promise<ProviderAvailableHour[]>;
  delete(hourId: string[] | string): Promise<void>;
}

export const USER_PROVIDER_HOURS_AVAILABLE_SERVICE =
  'USER_PROVIDER_HOURS_AVAILABLE_SERVICE';

export interface UserProviderHoursAvailableServiceInterface {
  execute(params: UserProviderHoursAvailableServiceParamsDto): Promise<void>;
}
