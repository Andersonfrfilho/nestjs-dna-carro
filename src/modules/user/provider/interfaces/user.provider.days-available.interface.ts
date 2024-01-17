import { UserProviderDaysAvailableServiceParamsDto } from '../dtos/user.provider.days-available.dto';
import { ProviderAvailableDay } from '../entities/provider-available-days.entity';

export const USER_PROVIDER_AVAILABLE_DAYS_REPOSITORY =
  'USER_PROVIDER_AVAILABLE_DAYS_REPOSITORY';

export interface UserProviderAvailableDaysRepositoryInterface {
  save(props: Partial<ProviderAvailableDay>): Promise<ProviderAvailableDay>;
  findByUserProviderId(providerId: string): Promise<ProviderAvailableDay[]>;
  delete(providerId: string | string[]): Promise<void>;
}

export const USER_PROVIDER_DAYS_AVAILABLE_SERVICE =
  'USER_PROVIDER_DAYS_AVAILABLE_SERVICE';

export interface UserProviderDaysAvailableServiceInterface {
  execute(params: UserProviderDaysAvailableServiceParamsDto): Promise<void>;
}
