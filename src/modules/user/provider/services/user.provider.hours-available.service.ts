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
import { UserProviderHoursAvailableServiceInterface } from '../interfaces/user.provider.hours-available.interface';
import { UserProviderHoursAvailableServiceParamsDto } from '../dtos/user.provider.hours-available.dto';

@Injectable()
export class UserProviderHoursAvailableService
  implements UserProviderHoursAvailableServiceInterface
{
  constructor(
    @Inject(USER_PROVIDER_REPOSITORY)
    private userProviderRepository: UserProviderRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderHoursAvailableServiceParamsDto,
  ): Promise<void> {
    try {
      const provider = await this.userProviderRepository.findByIdActive(
        params.providerId,
      );

      if (!provider) {
        throw new CustomException(USER_PROVIDER_NOT_FOUND);
      }

      const saveDaysPromise = params.hours.map((hour) =>
        this.userProviderRepository.createAvailableHour({
          start: hour.start,
          end: hour.end,
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
