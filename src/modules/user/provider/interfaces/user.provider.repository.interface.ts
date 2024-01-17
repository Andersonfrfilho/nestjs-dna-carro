import { UserProviderServiceDisableRepositoryParamsDto } from '../dtos/user.provider.service.dto';
import { ProviderAvailableDay } from '../entities/provider-available-days.entity';
import { ProviderAvailableHour } from '../entities/provider-available-hours.entity';
import { Provider } from '../entities/provider.entity';
import { Service } from '../entities/services.entity';

export const USER_PROVIDER_REPOSITORY = 'USER_PROVIDER_REPOSITORY';

export interface UserProviderRepositoryInterface {
  createAvailableDay(props: Partial<ProviderAvailableDay>): Promise<void>;
  createAvailableHour(props: Partial<ProviderAvailableHour>): Promise<void>;
  findByIdActive(id: string): Promise<Provider | null>;
  findDaysAvailableByProviderId(
    providerId: string,
  ): Promise<ProviderAvailableDay[]>;
  deleteDaysAvailableByProviderId(providerId: string): Promise<void>;
  deleteAvailableHourByProviderId(providerId: string): Promise<void>;
  findHoursAvailableByProviderId(
    providerId: string,
  ): Promise<ProviderAvailableHour[]>;
  createService(props: Partial<Service>): Promise<Service>;
  findServiceByProviderIdServiceId(
    props: UserProviderServiceDisableRepositoryParamsDto,
  ): Promise<Service | null>;
  disableService(service: Service): Promise<void>;
}
