import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

import { UserProviderAvailableDaysRepositoryInterface } from '../interfaces/user.provider.days-available.interface';
import { ProviderAvailableDay } from '../entities/provider-available-days.entity';

@Injectable()
export class UserProviderAvailableDaysRepository
  implements UserProviderAvailableDaysRepositoryInterface
{
  constructor(
    @InjectRepository(ProviderAvailableDay)
    private providerAvailableDaysRepository: Repository<ProviderAvailableDay>,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async findByUserProviderId(
    providerId: string,
  ): Promise<ProviderAvailableDay[]> {
    try {
      const days = await this.providerAvailableDaysRepository.find({
        where: {
          providerId,
        },
      });
      return days;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderAvailableDaysRepository - findByUserProviderId - error',
        {
          error,
        },
      );

      throw error;
    }
  }

  async delete(providerId: string): Promise<void> {
    try {
      await this.providerAvailableDaysRepository.delete({
        providerId,
      });
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderAvailableDaysRepository - delete - error',
        {
          error,
        },
      );

      throw error;
    }
  }

  async save(
    props: Partial<ProviderAvailableDay>,
  ): Promise<ProviderAvailableDay> {
    try {
      const day = await this.providerAvailableDaysRepository.save(props);
      return day;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderAvailableDaysRepository - save - error',
        {
          error,
        },
      );

      throw error;
    }
  }
}
