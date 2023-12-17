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
  FORGOT_PASSWORD_PHONE_VERIFY_CODE_INCORRECT,
  MAX_ATTEMPT_TRY_FORGOT_PASSWORD_VERIFY_PHONE_CODE,
  USER_NOT_FOUND,
} from '../auth.error';

import {
  TOKEN_PROVIDER,
  TokenProviderInterface,
} from '@src/providers/token/token.provider.interface';

import {
  AUTH_CACHE_KEYS,
  AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE_RESET_PASSWORD_TTL,
  AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE_TTL,
  CACHE_TOKEN_CONFIRMATION_PHONE_RESET_PASSWORD_NOT_FOUND,
  NUMBER_MAX_ATTEMPT_VERIFY_CODE_RESET_PASSWORD,
} from '../auth.constant';
import { EMAIL_INFO_NOT_FOUND } from '@src/modules/user/client/client.errors';
import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';

import { AuthForgotPasswordPhoneVerifyCodeServiceInterface } from '../interfaces/auth.forgot-password-phone-verify-code.interface';
import { AuthForgotPasswordPhoneVerifyCodeServiceParamsDto } from '../dtos/auth.forgot-password-phone-verify-code.dto';
import {
  AuthForgotPasswordPhoneSendCodeServiceResultDto,
  AuthForgotPasswordPhoneSendVerifyTokenCache,
  AuthForgotPasswordPhoneSendVerifyTokenPassCache,
  AuthForgotPasswordPhoneVerifyTokenPayloadDto,
} from '../dtos/auth.forgot-password-phone-send-code.dto';

@Injectable()
export class AuthForgotPasswordPhoneVerifyCodeService
  implements AuthForgotPasswordPhoneVerifyCodeServiceInterface
{
  constructor(
    @Inject(LOGGER_PROVIDER) private loggerProvider: LoggerProviderInterface,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepositoryInterface,
    @Inject(TOKEN_PROVIDER)
    private tokenProvider: TokenProviderInterface,
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
  ) {}
  async execute(
    params: AuthForgotPasswordPhoneVerifyCodeServiceParamsDto,
  ): Promise<void> {
    try {
      const { countryCode, ddd, number, code } = params;

      const user = await this.userRepository.findByPhoneActiveUser({
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

      const cacheToken =
        await this.cacheProvider.get<AuthForgotPasswordPhoneSendVerifyTokenCache>(
          key,
        );

      if (!cacheToken) {
        throw new CustomException(
          CACHE_TOKEN_CONFIRMATION_PHONE_RESET_PASSWORD_NOT_FOUND,
        );
      }

      if (cacheToken.attempt > NUMBER_MAX_ATTEMPT_VERIFY_CODE_RESET_PASSWORD) {
        await this.userRepository.inactiveUserByEmail(user.email);

        throw new CustomException(
          MAX_ATTEMPT_TRY_FORGOT_PASSWORD_VERIFY_PHONE_CODE,
        );
      }

      const payloadToken =
        await this.tokenProvider.verify<AuthForgotPasswordPhoneVerifyTokenPayloadDto>(
          {
            token: cacheToken.token,
          },
        );

      if (payloadToken.code !== code) {
        await this.cacheProvider.set<AuthForgotPasswordPhoneSendVerifyTokenCache>(
          {
            key,
            payload: { ...cacheToken, attempt: cacheToken.attempt + 1 },
            ttl: AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE_TTL,
          },
        );

        throw new CustomException(FORGOT_PASSWORD_PHONE_VERIFY_CODE_INCORRECT);
      }

      await this.cacheProvider.set<AuthForgotPasswordPhoneSendVerifyTokenPassCache>(
        {
          key,
          payload: { ...cacheToken, resetPassword: true },
          ttl: AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE_RESET_PASSWORD_TTL,
        },
      );
    } catch (error) {
      this.loggerProvider.error(
        'AuthForgotPasswordPhoneVerifyCodeService - execute - error',
        {
          error,
        },
      );

      throw error;
    }
  }
}
