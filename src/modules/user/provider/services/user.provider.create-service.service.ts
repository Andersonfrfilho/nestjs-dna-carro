import { Inject, Injectable } from '@nestjs/common';
import { CustomException } from '@src/error/custom.exception';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';
import { USER_NOT_FOUND } from '@src/modules/auth/auth.error';
import {
  USER_PROVIDER_REPOSITORY,
  UserProviderRepositoryInterface,
} from '../interfaces/user.provider.repository.interface';
import { UserProviderCreateServiceServiceParamsDto } from '../dtos/user.provider.service.dto';
import { Service } from '../entities/services.entity';
import { UserProviderCreateServiceServiceInterface } from '../interfaces/user.provider.service.interface';

@Injectable()
export class UserProviderCreateServiceService
  implements UserProviderCreateServiceServiceInterface
{
  constructor(
    @Inject(USER_PROVIDER_REPOSITORY)
    private userProviderRepository: UserProviderRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderCreateServiceServiceParamsDto,
  ): Promise<Service> {
    try {
      const provider = await this.userProviderRepository.findByIdActive(
        params.providerId,
      );

      if (!provider) {
        throw new CustomException(USER_NOT_FOUND);
      }

      const service = await this.userProviderRepository.createService({
        active: true,
        amount: params.amount,
        duration: params.duration,
        details: params.details,
        name: params.name,
        providerId: params.providerId,
      });

      return service;
    } catch (error) {
      this.loggerProvider.error(
        'UserProviderCreateServiceService - execute - error',
        {
          error: error,
        },
      );
      throw error;
    }
  }
}
