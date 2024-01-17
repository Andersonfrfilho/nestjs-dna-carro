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
  UserProviderRepositoryInterface,
} from '../interfaces/user.provider.repository.interface';
import { UserProviderDisableServiceServiceInterface } from '../interfaces/user.provider.service.interface';
import { UserProviderServiceDisableServiceParamsDto } from '../dtos/user.provider.disable-service.dto';

@Injectable()
export class UserProviderDisableServiceService
  implements UserProviderDisableServiceServiceInterface
{
  constructor(
    @Inject(USER_PROVIDER_REPOSITORY)
    private userProviderRepository: UserProviderRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderServiceDisableServiceParamsDto,
  ): Promise<void> {
    try {
      const provider = await this.userProviderRepository.findByIdActive(
        params.providerId,
      );

      if (!provider) {
        throw new CustomException(USER_NOT_FOUND);
      }

      const service =
        await this.userProviderRepository.findServiceByProviderIdServiceId({
          serviceId: params.serviceId,
          providerId: params.providerId,
        });

      if (!service) {
        throw new CustomException(SERVICE_NOT_FOUND);
      }

      await this.userProviderRepository.disableService(service);
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
