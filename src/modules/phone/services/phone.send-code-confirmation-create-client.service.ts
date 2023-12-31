import { Inject, Injectable } from '@nestjs/common';
import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';
import {
  PhoneSendCodeConfirmationCreateClientParamsDto,
  PhoneSendCodeConfirmationCreateClientServiceResponseDto,
  PhoneSendCodeConfirmationCreateClientTokenPayload,
} from '../dto/phone.send-code-confirmation-create-client.dto';
import {
  SMS_PROVIDER,
  SmsProviderInterface,
} from '@src/providers/sms/sms.provider.interface';
import {
  NameCacheKeyFlow,
  USER_CLIENT_CACHE_KEYS,
} from '@src/modules/user/client/client.constant';
import { PhoneAttribute, PhoneCacheCreateDto } from '../dto/phone.dto';
import {
  TOKEN_PROVIDER,
  TokenProviderInterface,
} from '@src/providers/token/token.provider.interface';
import { CustomException } from '@src/error/custom.exception';
import {
  CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND,
  EXCESSIVE_TRY_CODE_PHONE_CONFIRMATION,
} from '../phone.error';
import { PHONE_SEND_CODE_CONFIRMATION_SMS_MESSAGE } from '@src/providers/sms/sms.constant';
import { randomInt } from 'crypto';
import {
  EXPIRE_IN_TOKEN_SEND_CODE,
  EXPIRE_IN_TOKEN_SEND_CODE_MILLISECONDS,
  EXPIRE_IN_TOKEN_SEND_CODE_TTL,
  NUMBER_POSSIBLE_ATTEMPTS_CONFIRMATION_NUMBER,
} from '../phone.constant';
import { PhoneSendCodeConfirmationCreateClientServiceInterface } from '../interfaces/phone.send-code-confirmation-create-client.interface';
import { ENVIRONMENT_TEST_CONFIG, configEnvironment } from '@src/config';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';
import { convertMillisecondsInMinutes } from '@src/utils/convert-milliseconds-in-minutes';

@Injectable()
export class PhoneSendCodeConfirmationCreateClientService
  implements PhoneSendCodeConfirmationCreateClientServiceInterface
{
  constructor(
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
    @Inject(SMS_PROVIDER)
    private smsProvider: SmsProviderInterface,
    @Inject(TOKEN_PROVIDER)
    private tokenProvider: TokenProviderInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    phone: PhoneSendCodeConfirmationCreateClientParamsDto,
  ): Promise<PhoneSendCodeConfirmationCreateClientServiceResponseDto> {
    const keyPhone = `${phone.countryCode}${phone.ddd}${phone.number}`;

    try {
      const keyGetData = USER_CLIENT_CACHE_KEYS.CLIENT_CREATE_SERVICE_KEY({
        phone: keyPhone,
        key: NameCacheKeyFlow.phone,
      });
      const cacheData = await this.cacheProvider.get<PhoneAttribute>(
        keyGetData,
      );

      if (!cacheData) {
        throw new CustomException(CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND);
      }

      const { numberAttempts } = cacheData.phone;

      if (
        numberAttempts &&
        numberAttempts > NUMBER_POSSIBLE_ATTEMPTS_CONFIRMATION_NUMBER
      ) {
        throw new CustomException(EXCESSIVE_TRY_CODE_PHONE_CONFIRMATION);
      }

      const { countryCode, ddd, number } = cacheData.phone;

      const to = `${countryCode}${ddd}${number}`;

      const key = USER_CLIENT_CACHE_KEYS.PHONE_SEND_VERIFY_CODE({
        phone: to,
      });

      const isSendMessageAble =
        !ENVIRONMENT_TEST_CONFIG.includes(configEnvironment);

      const GET_LAST_FOUR_DIGIT_NUMBER = 4;

      const code = isSendMessageAble
        ? randomInt(1000, 9999).toString()
        : number.slice(-GET_LAST_FOUR_DIGIT_NUMBER);

      const token =
        await this.tokenProvider.assign<PhoneSendCodeConfirmationCreateClientTokenPayload>(
          {
            expiresIn: EXPIRE_IN_TOKEN_SEND_CODE,
            payloadParams: {
              phone: keyPhone,
              code,
            },
          },
        );

      await this.cacheProvider.set({
        key,
        payload: { token },
        ttl: EXPIRE_IN_TOKEN_SEND_CODE_TTL,
      });

      if (isSendMessageAble) {
        await this.smsProvider.send({
          message: PHONE_SEND_CODE_CONFIRMATION_SMS_MESSAGE(code),
          to,
        });
      }

      const timeExpiration = convertMillisecondsInMinutes(
        EXPIRE_IN_TOKEN_SEND_CODE_MILLISECONDS,
      );

      return {
        expirationInMilliseconds: timeExpiration,
      };
    } catch (error) {
      this.loggerProvider.error(
        'PhoneSendCodeConfirmationCreateClientService - execute - error',
        {
          error: error.message,
        },
      );

      throw error;
    }
  }
}
