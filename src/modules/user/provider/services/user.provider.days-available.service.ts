import { Inject, Injectable } from '@nestjs/common';
import { UserProviderDaysAvailableServiceInterface } from '../interfaces/user.provider.days-available.interface';
import { UserProviderDaysAvailableServiceParamsDto } from '../dtos/user.provider.days-available.dto';
import { CustomException } from '@src/error/custom.exception';
import { USER_PROVIDER_NOT_FOUND } from '../user.provider.errors';
import {
  USER_PROVIDER_REPOSITORY,
  UserProviderRepositoryInterface,
} from '../interfaces/user.provider.repository.interface';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

@Injectable()
export class UserProviderDaysAvailableService
  implements UserProviderDaysAvailableServiceInterface
{
  constructor(
    @Inject(USER_PROVIDER_REPOSITORY)
    private userProviderRepository: UserProviderRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderDaysAvailableServiceParamsDto,
  ): Promise<void> {
    try {
      const provider = await this.userProviderRepository.findByIdActive(
        params.providerId,
      );

      if (!provider) {
        throw new CustomException(USER_PROVIDER_NOT_FOUND);
      }

      const daysAvailable =
        await this.userProviderRepository.findDaysAvailableByProviderId(
          params.providerId,
        );

      if (daysAvailable.length > 0) {
        await this.userProviderRepository.deleteDaysAvailableByProviderId(
          params.providerId,
        );
      }

      const saveDaysPromise = params.days.map((day) =>
        this.userProviderRepository.createAvailableDay({
          day,
          providerId: params.providerId,
        }),
      );

      await Promise.all(saveDaysPromise);
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderDaysAvailableService - execute - error',
        {
          error: error,
        },
      );
      throw error;
    }
  }
}
