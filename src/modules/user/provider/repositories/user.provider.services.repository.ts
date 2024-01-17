import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

import { ProviderAvailableDay } from '../entities/provider-available-days.entity';
import { UserProviderServiceRepositoryInterface } from '../interfaces/user.provider.service.interface';
import { Service } from '../entities/services.entity';

@Injectable()
export class UserProviderServicesRepository
  implements UserProviderServiceRepositoryInterface
{
  constructor(
    @InjectRepository(Service)
    private userProviderServiceRepository: Repository<Service>,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async findServiceByProviderIdServiceId(
    params: Partial<Service>,
  ): Promise<Service | null> {
    try {
      const service = await this.userProviderServiceRepository.findOne({
        where: {
          id: params.id,
          providerId: params.providerId,
        },
      });
      return service;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderServicesRepository - findServiceByProviderIdServiceId - error',
        {
          error,
        },
      );

      throw error;
    }
  }
  async disable(service: Service): Promise<void> {
    try {
      await this.userProviderServiceRepository.update(service.id, {
        active: false,
      });
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderServicesRepository - disable - error',
        {
          error,
        },
      );

      throw error;
    }
  }

  async save(params: Partial<Service>): Promise<Service> {
    try {
      const service = await this.userProviderServiceRepository.save(params);
      return service;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderServicesRepository - save - error',
        {
          error,
        },
      );

      throw error;
    }
  }
}
