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
import { UserProviderGetAvailableDaysServiceInterface } from '../interfaces/user.provider.available-days.interface';
import {
  UserProviderGetAvailableDaysServiceParamsDto,
  UserProviderGetAvailableDaysServiceResultDto,
} from '../dtos/user.provider.available-days.dto';

@Injectable()
export class UserProviderGetAvailableDaysService
  implements UserProviderGetAvailableDaysServiceInterface
{
  constructor(
    @Inject(USER_PROVIDER_REPOSITORY)
    private userProviderRepository: UserProviderRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderGetAvailableDaysServiceParamsDto,
  ): Promise<UserProviderGetAvailableDaysServiceResultDto[]> {
    try {
      console.log('#########################=>', params.providerId);
      const providerDays =
        await this.userProviderRepository.findDaysAvailableByProviderId(
          params.providerId,
        );

      const formattedAppointment = instanceToPlain<ProviderAvailableDay>(
        providerDays,
      ) as ProviderAvailableDay[];

      return formattedAppointment;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderGetDaysService - execute - error',
        {
          error: { ...error, params },
        },
      );
      throw error;
    }
  }
}
