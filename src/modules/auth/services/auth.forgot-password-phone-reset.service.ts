import { Inject, Injectable } from '@nestjs/common';

import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '@src/modules/user/interfaces/repositories/user.repository.interface';
import { CustomException } from '@src/error/custom.exception';
import {
  PASSWORD_CONFIRMATION_NOT_IDENTICAL,
  USER_NOT_FOUND,
} from '../auth.error';
import {
  HASH_PROVIDER,
  HashProviderInterface,
} from '@src/providers/hash/hash.provider.interface';

import {
  AUTH_CACHE_KEYS,
  CACHE_TOKEN_CONFIRMATION_PHONE_RESET_PASSWORD_NOT_FOUND,
  CACHE_TOKEN_VALID_PHONE_RESET_PASSWORD,
} from '../auth.constant';
import { EMAIL_INFO_NOT_FOUND } from '@src/modules/user/client/client.errors';
import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';

import { AuthForgotPasswordPhoneResetServiceInterface } from '../interfaces/auth.forgot-password-phone-reset.interface';
import { AuthForgotPasswordPhoneResetServiceParamsDto } from '../dtos/auth.forgot-password-phone-reset.dto';
import { AuthForgotPasswordPhoneSendVerifyTokenPassCache } from '../dtos/auth.forgot-password-phone-send-code.dto';

@Injectable()
export class AuthForgotPasswordPhoneResetService
  implements AuthForgotPasswordPhoneResetServiceInterface
{
  constructor(
    @Inject(LOGGER_PROVIDER) private loggerProvider: LoggerProviderInterface,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepositoryInterface,
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
    @Inject(HASH_PROVIDER)
    private hashProvider: HashProviderInterface,
  ) {}
  async execute(
    params: AuthForgotPasswordPhoneResetServiceParamsDto,
  ): Promise<void> {
    try {
      const { countryCode, ddd, number, password, confirmPassword } = params;

      if (password !== confirmPassword) {
        throw new CustomException(PASSWORD_CONFIRMATION_NOT_IDENTICAL);
      }

      const user = await this.userRepository.findUserByPhoneActiveUserActive({
        countryCode,
        ddd,
        number,
      });

      if (!user) {
        throw new CustomException(USER_NOT_FOUND);
      }

      if (!user?.email) {
        throw new CustomException(EMAIL_INFO_NOT_FOUND);
      }

      const key = AUTH_CACHE_KEYS.PHONE_SEND_FORGOT_PASSWORD_PHONE_CODE(
        user.email,
      );

      const cacheData =
        await this.cacheProvider.get<AuthForgotPasswordPhoneSendVerifyTokenPassCache>(
          key,
        );

      if (!cacheData) {
        throw new CustomException(
          CACHE_TOKEN_CONFIRMATION_PHONE_RESET_PASSWORD_NOT_FOUND,
        );
      }

      if (!cacheData.resetPassword) {
        throw new CustomException(CACHE_TOKEN_VALID_PHONE_RESET_PASSWORD);
      }

      const passwordHash = await this.hashProvider.hash(password);

      await this.userRepository.updatePasswordByEmailUserActive({
        email: user?.email,
        passwordHash,
      });
    } catch (error) {
      this.loggerProvider.error(
        'AuthForgotPasswordPhoneResetService - execute - error',
        {
          error,
        },
      );

      throw error;
    }
  }
}
