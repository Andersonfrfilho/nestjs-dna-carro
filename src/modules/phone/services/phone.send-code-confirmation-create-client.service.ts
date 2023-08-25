import { Inject, Injectable } from '@nestjs/common';
import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';
import {
  PhoneSendCodeConfirmationCreateClientParamsDto,
  PhoneSendCodeConfirmationCreateClientTokenPayload,
} from '../dto/phone.send-code-confirmation-create-client.dto';
import {
  SMS_PROVIDER,
  SmsProviderInterface,
} from '@src/providers/sms/sms.provider.interface';
import { CACHE_KEYS } from '@src/providers/cache/constants/cache.constant.keys';
import { NameCacheKeyFlow } from '@src/modules/user/client/client.constant';
import { PhoneCacheCreateDto } from '../dto/phone.dto';
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
  EXPIRE_IN_TOKEN_SEND_CODE_TTL,
  NUMBER_POSSIBLE_ATTEMPTS_CONFIRMATION_NUMBER,
} from '../phone.constant';
import { PhoneSendCodeConfirmationCreateClientServiceInterface } from '../interfaces/phone.send-code-confirmation-create-client.interface';
import { ENVIRONMENT_TEST_CONFIG, configEnvironment } from '@src/config';

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
  ) {}
  async execute({
    email,
  }: PhoneSendCodeConfirmationCreateClientParamsDto): Promise<void> {
    const keyGetData = CACHE_KEYS.CLIENT_CREATE_SERVICE({
      email: email,
      key: NameCacheKeyFlow.phone,
    });

    const cacheData = await this.cacheProvider.get<PhoneCacheCreateDto>(
      keyGetData,
    );

    if (!cacheData) {
      throw new CustomException(CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND);
    }

    const { numberAttempts } = cacheData;

    if (numberAttempts > NUMBER_POSSIBLE_ATTEMPTS_CONFIRMATION_NUMBER) {
      throw new CustomException(EXCESSIVE_TRY_CODE_PHONE_CONFIRMATION);
    }

    const { countryCode, ddd, number } = cacheData;

    const to = `${countryCode}${ddd}${number}`;

    const key = CACHE_KEYS.PHONE_SEND_VERIFY_CODE({
      email,
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
            email,
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
  }
}
