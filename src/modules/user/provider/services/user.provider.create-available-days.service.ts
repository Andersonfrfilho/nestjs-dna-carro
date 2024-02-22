import { Inject, Injectable } from '@nestjs/common';
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
import { UserProviderCreateAvailableDaysServiceInterface } from '../interfaces/user.provider.available-days.interface';
import {
  UserProviderCreateAvailableDaysControllerResultDto,
  UserProviderCreateAvailableDaysServiceParamsDto,
} from '../dtos/user.provider.available-days.dto';

@Injectable()
export class UserProviderCreateAvailableDaysService
  implements UserProviderCreateAvailableDaysServiceInterface
{
  constructor(
    @Inject(USER_PROVIDER_REPOSITORY)
    private userProviderRepository: UserProviderRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderCreateAvailableDaysServiceParamsDto,
  ): Promise<UserProviderCreateAvailableDaysControllerResultDto[]> {
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

      const data = await Promise.all(saveDaysPromise);

      return data;
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
