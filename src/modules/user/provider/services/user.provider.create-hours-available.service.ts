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
import { UserProviderCreateAvailabilitiesHoursServiceInterface } from '../interfaces/user.provider.availabilities-hours.interface';
import {
  UserProviderCreateAvailabilitiesHoursServiceParamsDto,
  UserProviderCreateAvailabilitiesHoursServiceResultDto,
} from '../dtos/user.provider.availabilities-hours.dto';
import { getHoursByPeriodFifteenMinutes } from '../provider.utils';

@Injectable()
export class UserProviderCreateAvailabilitiesHoursService
  implements UserProviderCreateAvailabilitiesHoursServiceInterface
{
  constructor(
    @Inject(USER_PROVIDER_REPOSITORY)
    private userProviderRepository: UserProviderRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderCreateAvailabilitiesHoursServiceParamsDto,
  ): Promise<UserProviderCreateAvailabilitiesHoursServiceResultDto[]> {
    try {
      const provider = await this.userProviderRepository.findByIdActive(
        params.providerId,
      );

      if (!provider) {
        throw new CustomException(USER_PROVIDER_NOT_FOUND);
      }

      await this.userProviderRepository.deleteAvailableHourByProviderId(
        params.providerId,
      );

      const saveDaysPromise = params.hours.map((hour) =>
        this.userProviderRepository.createAvailableHour({
          start: hour.start,
          end: hour.end,
          providerId: params.providerId,
        }),
      );

      const dataHours = await Promise.all(saveDaysPromise);

      const hourByPeriod = getHoursByPeriodFifteenMinutes(dataHours);

      return hourByPeriod;
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
