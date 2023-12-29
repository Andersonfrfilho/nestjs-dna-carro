import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '@modules/user/interfaces/repositories/user.repository.interface';
import {
  USER_TYPES_USER_REPOSITORY,
  UserTypesUserRepositoryInterface,
} from '@src/modules/user/interfaces/repositories/user.types.user.repository.interface';
import { CustomException } from '@src/error/custom.exception';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';
import {
  USER_PROVIDER_NOT_FOUND,
  USER_TYPE_PROVIDER_ENABLE_NOT_FOUND,
} from '../user.provider.errors';
import { UserProviderInternalDisableServiceInterface } from '../interfaces/user.provider.internal-disable.interface';
import { UserProviderInternalDisableServiceParamsDto } from '../dtos/user.provider.internal-disable.dto';

@Injectable()
export class UserProviderInternalDisableService
  implements UserProviderInternalDisableServiceInterface
{
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepositoryInterface,
    @Inject(USER_TYPES_USER_REPOSITORY)
    private userTypesUserRepository: UserTypesUserRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: UserProviderInternalDisableServiceParamsDto,
  ): Promise<void> {
    try {
      const user = await this.userRepository.findByIdActive(params.userId);

      if (!user) {
        throw new CustomException(USER_PROVIDER_NOT_FOUND);
      }

      const userTypesUser =
        await this.userTypesUserRepository.findTypesUserByIdAndActive(user.id);

      if (!userTypesUser) {
        throw new CustomException(USER_TYPE_PROVIDER_ENABLE_NOT_FOUND);
      }

      await this.userTypesUserRepository.disableUserTypeUserByUserId({
        ...userTypesUser,
        active: false,
      });
    } catch (error) {
      this.loggerProvider.error('UserProviderCreateService - execute - error', {
        error: error,
      });
      throw error;
    }
  }
}
