import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

import { ProviderAvailableHour } from '../entities/provider-available-hours.entity';
import { UserProviderAvailableHoursRepositoryInterface } from '../interfaces/user.provider.availabilities-hours.interface';

@Injectable()
export class UserProviderAvailableHoursRepository
  implements UserProviderAvailableHoursRepositoryInterface
{
  constructor(
    @InjectRepository(ProviderAvailableHour)
    private providerAvailableHoursRepository: Repository<ProviderAvailableHour>,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async updateDeleteAt(id: string): Promise<void> {
    try {
      await this.providerAvailableHoursRepository.update(id, {
        deletedAt: new Date(),
      });
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderAvailableHoursRepository - updateDeleteAt - error',
        {
          error,
        },
      );
      throw error;
    }
  }
  async findByUserProviderId(
    providerId: string,
  ): Promise<ProviderAvailableHour[]> {
    try {
      const hours = await this.providerAvailableHoursRepository.find({
        where: {
          providerId,
        },
      });

      return hours;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderAvailableHoursRepository - findByUserProviderId - error',
        {
          error,
        },
      );

      throw error;
    }
  }

  async delete(hourId: string): Promise<void> {
    try {
      await this.providerAvailableHoursRepository.delete(hourId);
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderAvailableHoursRepository - delete - error',
        {
          error,
        },
      );

      throw error;
    }
  }
  async save(
    props: Partial<ProviderAvailableHour>,
  ): Promise<ProviderAvailableHour> {
    try {
      const day = await this.providerAvailableHoursRepository.save(props);
      return day;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderAvailableHoursRepository - save - error',
        {
          error,
        },
      );

      throw error;
    }
  }
}
