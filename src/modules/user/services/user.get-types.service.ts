import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '@modules/user/interfaces/repositories/user.repository.interface';

import { User } from '@src/modules/user/entities/user.entity';

import { UserGetTypesServiceInterface } from '../interfaces/user.get-types.interface';
import { UserGetTypesServiceParamsDto } from '../dto/user.dto';
import { CustomException } from '@src/error/custom.exception';
import { USER_NOT_FOUND } from '../user.errors';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

@Injectable()
export class UserGetTypesService implements UserGetTypesServiceInterface {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(params: UserGetTypesServiceParamsDto): Promise<User> {
    try {
      const user = await this.userRepository.findByIdActiveWithTypes(
        params.userId,
      );

      if (!user) {
        throw new CustomException(USER_NOT_FOUND);
      }

      return user;
    } catch (error) {
      this.loggerProvider.error('UserGetTypesService - execute - error', {
        error: error,
      });

      throw error;
    }
  }
}
