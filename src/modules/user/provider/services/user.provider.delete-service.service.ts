import { Inject, Injectable } from '@nestjs/common';
import { CustomException } from '@src/error/custom.exception';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';
import {
  SERVICE_NOT_FOUND,
  USER_NOT_FOUND,
} from '@src/modules/auth/auth.error';
import {
  USER_PROVIDER_REPOSITORY,
  USER_PROVIDER_SERVICE_REPOSITORY,
  UserProviderRepositoryInterface,
  UserProviderServiceRepositoryInterface,
} from '../interfaces/user.provider.repository.interface';
import { UserProviderDeleteServiceServiceInterface } from '../interfaces/user.provider.delete-service.interface';
import { UserProviderDeleteServiceServiceParamsDto } from '../dtos/user.provier-delete-services.dto';
import { ORDER } from '@src/modules/common/enums/commons.pagination.enum';
import { Service } from '../entities/services.entity';
import { instanceToPlain } from 'class-transformer';
import { formatPaginationResults } from '@src/modules/common/utils/formatPagination';

@Injectable()
export class UserProviderDeleteServiceService
  implements UserProviderDeleteServiceServiceInterface
{
  constructor(
    @Inject(USER_PROVIDER_REPOSITORY)
    private userProviderRepository: UserProviderRepositoryInterface,
    @Inject(USER_PROVIDER_SERVICE_REPOSITORY)
    private userProviderServiceRepository: UserProviderServiceRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderDeleteServiceServiceParamsDto,
  ): Promise<void> {
    try {
      const provider = await this.userProviderRepository.findByIdActive(
        params.providerId,
      );

      if (!provider) {
        throw new CustomException(USER_NOT_FOUND);
      }

      await this.userProviderRepository.deleteService({
        serviceId: params.serviceId,
        providerId: params.providerId,
      });
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderDisableServiceService - execute - error',
        {
          error: error,
        },
      );
      throw error;
    }
  }
}
