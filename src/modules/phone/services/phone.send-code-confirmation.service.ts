import { Inject, Injectable } from '@nestjs/common';
import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';
import {
  PhoneSendCodeConfirmationCreateClientParamsDto,
  PhoneSendCodeConfirmationCreateClientTokenPayload,
} from '../dto/phone.send-code-confirmation.dto';
import { PhoneSendCodeConfirmationCreateClientInterface } from '../interfaces/phone.send-code-confirmation.service.interface';
import {
  SMS_PROVIDER,
  SmsProviderInterface,
} from '@src/providers/sms/sms.provider.interface';
import { CACHE_KEYS } from '@src/providers/cache/constants/cache.constant.keys';
import { NameCacheKeyFlow } from '@src/modules/client/client.constant';
import { PhoneDto } from '../dto/phone.dto';
import {
  TOKEN_PROVIDER,
  TokenProviderInterface,
} from '@src/providers/token/token.provider.interface';
import { CustomException } from '@src/error/custom.exception';
import { CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND } from '../phone.error';
import { PHONE_SEND_CODE_CONFIRMATION } from '@src/providers/sms/sms.constant';
import { randomInt } from 'crypto';
import {
  EXPIRE_IN_TOKEN_SEND_CODE,
  EXPIRE_IN_TOKEN_SEND_CODE_TTL,
} from '../phone.constant';

@Injectable()
export class PhoneSendCodeConfirmationCreateClient
  implements PhoneSendCodeConfirmationCreateClientInterface
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

    const cacheData = await this.cacheProvider.get<PhoneDto>(keyGetData);

    if (!cacheData) {
      throw new CustomException(CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND);
    }

    const { countryCode, ddd, number } = cacheData;

    const to = `+${countryCode}${ddd}${number}`;

    const code = randomInt(1000, 9999).toString();

    const key = CACHE_KEYS.PHONE_SEND_VERIFY_CODE({
      email,
    });

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

    await this.smsProvider.send({
      message: PHONE_SEND_CODE_CONFIRMATION(code),
      to,
    });
  }
}
