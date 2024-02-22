import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

import { UserProviderRepositoryInterface } from '../interfaces/user.provider.repository.interface';
import { ProviderAvailableHour } from '../entities/provider-available-hours.entity';
import { Provider } from '../entities/provider.entity';
import { ProviderAvailableDay } from '../entities/provider-available-days.entity';
import {
  USER_PROVIDER_AVAILABLE_HOURS_REPOSITORY,
  UserProviderAvailableHoursRepositoryInterface,
} from '../interfaces/user.provider.hours-available.interface';
import {
  USER_PROVIDER_SERVICE_REPOSITORY,
  UserProviderServiceRepositoryInterface,
} from '../interfaces/user.provider.service.interface';
import { Service } from '../entities/services.entity';
import { UserProviderServiceDisableRepositoryParamsDto } from '../dtos/user.provider.service.dto';
import {
  USER_PROVIDER_AVAILABLE_DAYS_REPOSITORY,
  UserProviderAvailableDaysRepositoryInterface,
} from '../interfaces/user.provider.available-days.interface';

@Injectable()
export class UserProviderRepository implements UserProviderRepositoryInterface {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
    @Inject(USER_PROVIDER_AVAILABLE_DAYS_REPOSITORY)
    private userProviderAvailableDaysRepository: UserProviderAvailableDaysRepositoryInterface,
    @Inject(USER_PROVIDER_AVAILABLE_HOURS_REPOSITORY)
    private userProviderAvailableHoursRepository: UserProviderAvailableHoursRepositoryInterface,
    @Inject(USER_PROVIDER_SERVICE_REPOSITORY)
    private userProviderServiceRepository: UserProviderServiceRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async findServiceByProviderIdServiceId(
    props: UserProviderServiceDisableRepositoryParamsDto,
  ): Promise<Service | null> {
    try {
      const service =
        await this.userProviderServiceRepository.findServiceByProviderIdServiceId(
          props,
        );
      return service;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderRepository - findServiceByProviderIdServiceId - error',
        {
          error,
        },
      );
      throw error;
    }
  }

  async disableService(service: Service): Promise<void> {
    try {
      await this.userProviderServiceRepository.disable(service);
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderRepository - disableService - error',
        {
          error,
        },
      );
      throw error;
    }
  }

  async createService(props: Partial<Service>): Promise<Service> {
    try {
      const service = await this.userProviderServiceRepository.save(props);
      return service;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderRepository - createService - error',
        {
          error,
        },
      );
      throw error;
    }
  }
  async findDaysAvailableByProviderId(
    providerId: string,
  ): Promise<ProviderAvailableDay[]> {
    try {
      const days =
        await this.userProviderAvailableDaysRepository.findByUserProviderId(
          providerId,
        );
      return days;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderRepository - findDaysAvailableByProviderId - error',
        {
          error,
        },
      );
      throw error;
    }
  }

  async deleteDaysAvailableByProviderId(providerId: string): Promise<void> {
    try {
      const daysAvailable = await this.findDaysAvailableByProviderId(
        providerId,
      );

      if (daysAvailable.length > 0) {
        const daysAvailableIds = daysAvailable.map((day) => {
          return this.userProviderAvailableDaysRepository.updateDeleteAt(
            day.id,
          );
        });
        Promise.all(daysAvailableIds);
      }
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderRepository - deleteDaysAvailableByProviderId - error',
        {
          error,
        },
      );
      throw error;
    }
  }
  async deleteAvailableHourByProviderId(providerId: string): Promise<void> {
    try {
      const hoursAvailable = await this.findHoursAvailableByProviderId(
        providerId,
      );

      if (hoursAvailable.length > 0) {
        const hoursAvailableIds = hoursAvailable.map((hour) => hour.id);
        await this.userProviderAvailableHoursRepository.delete(
          hoursAvailableIds,
        );
      }
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderRepository - deleteAvailableHourByProviderId - error',
        {
          error,
        },
      );
      throw error;
    }
  }
  async findHoursAvailableByProviderId(
    providerId: string,
  ): Promise<ProviderAvailableHour[]> {
    try {
      const hours =
        await this.userProviderAvailableHoursRepository.findByUserProviderId(
          providerId,
        );
      return hours;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderRepository - findHoursAvailableByProviderId - error',
        {
          error,
        },
      );
      throw error;
    }
  }
  async createAvailableHour(
    props: Partial<ProviderAvailableHour>,
  ): Promise<void> {
    try {
      await this.userProviderAvailableHoursRepository.save(props);
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderRepository - createAvailableHour - error',
        {
          error,
        },
      );
    }
  }
  async findByIdActive(id: string): Promise<Provider | null> {
    try {
      const provider = await this.providerRepository.findOne({
        where: {
          id,
          active: true,
        },
      });
      return provider;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderRepository - findByIdActive - error',
        {
          ...error,
          id,
        },
      );
      throw error;
    }
  }
  async createAvailableDay(
    props: Partial<ProviderAvailableDay>,
  ): Promise<ProviderAvailableDay> {
    try {
      const day = await this.userProviderAvailableDaysRepository.save(props);
      return day;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderRepository - createAvailableDay - error',
        {
          error,
        },
      );
      throw error;
    }
  }
}
