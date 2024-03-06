import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

import { Service } from '../entities/services.entity';
import { UserProviderServiceRepositoryInterface } from '../interfaces/user.provider.repository.interface';
import {
  FindByProvidersIdActiveWithPaginationParamsDto,
  FindByProvidersIdActiveWithPaginationResultDto,
} from '../dtos/user.provider.repository.dto';
import { ORDER } from '@src/modules/common/enums/commons.pagination.enum';
import { DeleteServiceByProviderIdParamsDto } from '../dtos/user.provider.service.dto';

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
  async updateDeleteAt({
    providerId,
    serviceId,
  }: DeleteServiceByProviderIdParamsDto): Promise<void> {
    try {
      await this.userProviderServiceRepository.update(
        {
          providerId,
          id: serviceId,
        },
        {
          deletedAt: new Date(),
        },
      );
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderServicesRepository - updateDeleteAt - error',
        {
          error,
        },
      );
      throw error;
    }
  }

  async findServicesByProviderId({
    page = '0',
    size = '10',
    order = {
      field: 'createdAt',
      order: ORDER.ASC,
    },
    providerId,
  }: FindByProvidersIdActiveWithPaginationParamsDto): Promise<FindByProvidersIdActiveWithPaginationResultDto> {
    try {
      const services = await this.userProviderServiceRepository.findAndCount({
        where: {
          providerId,
        },
        take: Number(size),
        skip: Number(page),
        order: {
          [order.field]: ORDER.ASC,
        },
      });

      return {
        data: services[0],
        total: services[1],
        page,
        size,
      };
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderServicesRepository - findServicesActiveByProviderId - error',
        {
          error,
        },
      );
      throw error;
    }
  }
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
