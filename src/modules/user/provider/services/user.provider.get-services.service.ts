import { Inject, Injectable } from '@nestjs/common';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

import { formatPaginationResults } from '@src/modules/common/utils/formatPagination';
import { instanceToPlain } from 'class-transformer';

import { UserProviderGetServicesServiceInterface } from '../interfaces/user.provider.get-services.interface';
import {
  USER_PROVIDER_SERVICE_REPOSITORY,
  UserProviderServiceRepositoryInterface,
} from '../interfaces/user.provider.repository.interface';
import { Service } from '../entities/services.entity';
import {
  UserProviderGetServicesServiceParamsDto,
  UserProviderGetServicesServiceResultDto,
} from '../dtos/user.provier-get-services.dto';

@Injectable()
export class UserProviderGetServicesService
  implements UserProviderGetServicesServiceInterface
{
  constructor(
    @Inject(USER_PROVIDER_SERVICE_REPOSITORY)
    private userProviderServiceRepository: UserProviderServiceRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderGetServicesServiceParamsDto,
  ): Promise<UserProviderGetServicesServiceResultDto> {
    try {
      this.loggerProvider.info('UserProviderGetServicesService - execute', {
        params,
      });

      const services =
        await this.userProviderServiceRepository.findServicesByProviderId(
          params,
        );

      const formattedServices = instanceToPlain<Service[]>(
        services.data,
      ) as Service[];

      const formatPagination = formatPaginationResults<Service>({
        ...services,
        data: formattedServices,
        url: params.url,
      });

      return formatPagination;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderGetServicesService - execute - error',
        {
          error: { ...error, params },
          params,
        },
      );
      throw error;
    }
  }
}
