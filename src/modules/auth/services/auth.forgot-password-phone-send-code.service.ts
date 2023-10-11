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
import { USER_NOT_FOUND } from '../auth.error';
import {
  TOKEN_PROVIDER,
  TokenProviderInterface,
} from '@src/providers/token/token.provider.interface';
import { ENVIRONMENT_TEST_CONFIG, configEnvironment } from '@src/config';

import { AuthForgotPasswordPhoneSendCodeServiceInterface } from '../interfaces/auth.forgot-password-phone-send-code.interface';
import {
  AuthForgotPasswordPhoneSendCodeServiceParamsDto,
  AuthForgotPasswordPhoneSendVerifyTokenCache,
  PhoneSendCodeAuthForgotPasswordPhoneSendCodeTokenPayload,
} from '../dtos/auth.forgot-password-phone-send-code.dto';
import { randomInt } from 'crypto';
import {
  AUTH_CACHE_KEYS,
  AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE,
  AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE_TTL,
  AUTH_FORGOT_PASSWORD_PHONE_CODE_SEND_SMS_MESSAGE,
} from '../auth.constant';
import { EMAIL_INFO_NOT_FOUND } from '@src/modules/user/client/client.errors';
import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';
import {
  SMS_PROVIDER,
  SmsProviderInterface,
} from '@src/providers/sms/sms.provider.interface';

@Injectable()
export class AuthForgotPasswordPhoneSendCodeService
  implements AuthForgotPasswordPhoneSendCodeServiceInterface
{
  constructor(
    @Inject(LOGGER_PROVIDER) private loggerProvider: LoggerProviderInterface,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepositoryInterface,
    @Inject(TOKEN_PROVIDER)
    private tokenProvider: TokenProviderInterface,
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
    @Inject(SMS_PROVIDER)
    private smsProvider: SmsProviderInterface,
  ) {}
  async execute(
    params: AuthForgotPasswordPhoneSendCodeServiceParamsDto,
  ): Promise<void> {
    try {
      const { countryCode, ddd, number } = params;
      const user = await this.userRepository.findUserByPhoneActiveUserActive({
        countryCode,
        ddd,
        number,
      });

      if (!user) {
        throw new CustomException(USER_NOT_FOUND);
      }

      const isSendMessageAble =
        !ENVIRONMENT_TEST_CONFIG.includes(configEnvironment);

      const GET_LAST_FOUR_DIGIT_NUMBER = 4;

      const code = isSendMessageAble
        ? randomInt(1000, 9999).toString()
        : number.slice(-GET_LAST_FOUR_DIGIT_NUMBER);

      if (!user?.email) {
        throw new CustomException(EMAIL_INFO_NOT_FOUND);
      }

      const token =
        await this.tokenProvider.assign<PhoneSendCodeAuthForgotPasswordPhoneSendCodeTokenPayload>(
          {
            expiresIn: AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE,
            payloadParams: {
              email: user.email,
              code,
            },
          },
        );

      const key = AUTH_CACHE_KEYS.PHONE_SEND_FORGOT_PASSWORD_PHONE_CODE(
        user.email,
      );

      await this.cacheProvider.set<AuthForgotPasswordPhoneSendVerifyTokenCache>(
        {
          key,
          payload: { token, attempt: 0 },
          ttl: AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE_TTL,
        },
      );

      const to = `${countryCode}${ddd}${number}`;

      if (isSendMessageAble) {
        await this.smsProvider.send({
          message: AUTH_FORGOT_PASSWORD_PHONE_CODE_SEND_SMS_MESSAGE(code),
          to,
        });
      }
    } catch (error) {
      this.loggerProvider.error(
        'AuthForgotPasswordPhoneSendCodeService - execute - error',
        {
          error,
        },
      );

      throw error;
    }
  }
}
