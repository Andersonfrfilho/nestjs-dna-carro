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
import { UserProviderCreateServiceParamsDto } from '../dtos/user.provider.create.dto';
import { UserProviderCreateServiceInterface } from '../interfaces/user.provider.create.interface';
import { USER_PROVIDER_TYPE_ID } from '../user.provider.constant';
import { USER_NOT_FOUND } from '../user.provider.errors';

@Injectable()
export class UserProviderCreateService
  implements UserProviderCreateServiceInterface
{
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepositoryInterface,
    @Inject(USER_TYPES_USER_REPOSITORY)
    private userTypesUserRepository: UserTypesUserRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(params: UserProviderCreateServiceParamsDto): Promise<void> {
    try {
      const user = await this.userRepository.findByIdActive(params.userId);

      if (!user) {
        throw new CustomException(USER_NOT_FOUND);
      }

      const userTypesUser =
        await this.userTypesUserRepository.findTypesUserById(user.id);

      const userIsProvider = userTypesUser.filter(
        (userTypeUser) => userTypeUser.userTypeId === USER_PROVIDER_TYPE_ID,
      );
      console.log('userIsProvider', userIsProvider);
      // if (userIsProvider)
      //   if (userIsProvider) {
      //   }

      await this.userTypesUserRepository.createUserProvider({
        userId: params.userId,
        active: true,
      });
    } catch (error) {
      this.loggerProvider.error('UserProviderCreateService - execute - error', {
        error: error,
      });
      throw error;
    }
  }
}
