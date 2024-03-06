import {
  DeleteServiceByProviderIdParamsDto,
  FindByProvidersIdActiveWithPaginationParamsDto,
  FindByProvidersIdActiveWithPaginationResultDto,
} from '../dtos/user.provider.repository.dto';
import { UserProviderServiceDisableRepositoryParamsDto } from '../dtos/user.provider.service.dto';
import { ProviderAvailableDay } from '../entities/provider-available-days.entity';
import { ProviderAvailableHour } from '../entities/provider-available-hours.entity';
import { Provider } from '../entities/provider.entity';
import { Service } from '../entities/services.entity';

export const USER_PROVIDER_REPOSITORY = 'USER_PROVIDER_REPOSITORY';

export interface UserProviderRepositoryInterface {
  createAvailableDay(
    props: Partial<ProviderAvailableDay>,
  ): Promise<ProviderAvailableDay>;
  createAvailableHour(
    props: Partial<ProviderAvailableHour>,
  ): Promise<ProviderAvailableHour>;
  findByIdActive(id: string): Promise<Provider | null>;
  findDaysAvailableByProviderId(
    providerId: string,
  ): Promise<ProviderAvailableDay[]>;
  deleteService(params: DeleteServiceByProviderIdParamsDto): Promise<void>;
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

export const USER_PROVIDER_SERVICE_REPOSITORY =
  'USER_PROVIDER_SERVICE_REPOSITORY';

export interface UserProviderServiceRepositoryInterface {
  save(params: Partial<Service>): Promise<Service>;
  findServiceByProviderIdServiceId(
    params: Partial<Service>,
  ): Promise<Service | null>;
  findServicesByProviderId(
    params: FindByProvidersIdActiveWithPaginationParamsDto,
  ): Promise<FindByProvidersIdActiveWithPaginationResultDto>;
  disable(service: Service): Promise<void>;
  updateDeleteAt(params: DeleteServiceByProviderIdParamsDto): Promise<void>;
}
