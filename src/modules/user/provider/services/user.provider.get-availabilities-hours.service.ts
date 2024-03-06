import { Inject, Injectable } from '@nestjs/common';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

import { instanceToPlain } from 'class-transformer';

import {
  USER_PROVIDER_REPOSITORY,
  UserProviderRepositoryInterface,
} from '../interfaces/user.provider.repository.interface';

import { ProviderAvailableDay } from '../entities/provider-available-days.entity';
import {
  UserProviderGetAvailableDaysServiceParamsDto,
  UserProviderGetAvailableDaysServiceResultDto,
} from '../dtos/user.provider.available-days.dto';
import { UserProviderGetAvailabilitiesHoursServiceInterface } from '../interfaces/user.provider.availabilities-hours.interface';
import {
  UserProviderGetAvailabilitiesHoursServiceParamsDto,
  UserProviderGetAvailabilitiesHoursServiceResultDto,
} from '../dtos/user.provider.availabilities-hours.dto';
import { getHoursByPeriodFifteenMinutes } from '../provider.utils';

@Injectable()
export class UserProviderGetAvailabilitiesHoursService
  implements UserProviderGetAvailabilitiesHoursServiceInterface
{
  constructor(
    @Inject(USER_PROVIDER_REPOSITORY)
    private userProviderRepository: UserProviderRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderGetAvailabilitiesHoursServiceParamsDto,
  ): Promise<UserProviderGetAvailabilitiesHoursServiceResultDto[]> {
    try {
      const providerHours =
        await this.userProviderRepository.findHoursAvailableByProviderId(
          params.providerId,
        );

      const hourByPeriod = getHoursByPeriodFifteenMinutes(providerHours);
      return hourByPeriod;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderGetAvailableHoursService - execute - error',
        {
          error: { ...error, params },
        },
      );
      throw error;
    }
  }
}
