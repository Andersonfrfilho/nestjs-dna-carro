import { Inject, Injectable } from '@nestjs/common';
import { PhoneVerifyCodeConfirmationCreateClientServiceInterface } from '../interfaces/phone.verify-code-confirmation-create-client.interface';
import {
  PhoneVerifyCodeConfirmationCreateClientServiceParamsDto,
  PhoneVerifyCodeConfirmationGetTokenCacheDto,
  PhoneVerifyCodeConfirmationGetTokenPayloadCacheDto,
} from '../dto/phone.verify-code-confirmation-create-client.dto';
import {
  TOKEN_PROVIDER,
  TokenProviderInterface,
} from '@src/providers/token/token.provider.interface';
import { CACHE_KEYS } from '@src/providers/cache/constants/cache.constant.keys';
import { NameCacheKeyFlow } from '@src/modules/client/client.constant';
import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';
import { PhoneDto } from '../dto/phone.dto';
import { CustomException } from '@src/error/custom.exception';
import {
  CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND,
  CACHE_TOKEN_CONFIRMATION_PHONE_NOT_FOUND,
  EMAIL_TOKEN_CONFIRMATION_INCORRECT,
  PHONE_NUMBER_CACHE_CONFLICT_INFO,
  PHONE_NUMBER_CODE_CONFIRMATION_INCORRECT,
} from '../phone.error';
import { CACHE_TTL } from '@src/providers/cache/constants/cache.constant.ttl';

@Injectable()
export class PhoneVerifyCodeConfirmationCreateClientService
  implements PhoneVerifyCodeConfirmationCreateClientServiceInterface
{
  constructor(
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
    @Inject(TOKEN_PROVIDER)
    private tokenProvider: TokenProviderInterface,
  ) {}
  async execute({
    code,
    countryCode,
    ddd,
    number,
    email,
  }: PhoneVerifyCodeConfirmationCreateClientServiceParamsDto): Promise<void> {
    console.log('############## - 1');
    const keyGetPhoneData = CACHE_KEYS.CLIENT_CREATE_SERVICE({
      email: email,
      key: NameCacheKeyFlow.phone,
    });
    console.log('############## - 1');

    const cachePhoneData = await this.cacheProvider.get<PhoneDto>(
      keyGetPhoneData,
    );

    if (!cachePhoneData) {
      throw new CustomException(CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND);
    }

    const {
      countryCode: countryCodeCache,
      ddd: dddCache,
      number: numberCache,
    } = cachePhoneData;

    if (
      countryCode !== countryCodeCache &&
      ddd !== dddCache &&
      number !== numberCache
    ) {
      throw new CustomException(PHONE_NUMBER_CACHE_CONFLICT_INFO);
    }

    const keyGetTokenData = CACHE_KEYS.PHONE_SEND_VERIFY_CODE({
      email,
    });

    const cacheTokenData =
      await this.cacheProvider.get<PhoneVerifyCodeConfirmationGetTokenCacheDto>(
        keyGetTokenData,
      );

    if (!cacheTokenData) {
      throw new CustomException(CACHE_TOKEN_CONFIRMATION_PHONE_NOT_FOUND);
    }
    const { token } = cacheTokenData;

    const codeToken =
      await this.tokenProvider.verify<PhoneVerifyCodeConfirmationGetTokenPayloadCacheDto>(
        { token },
      );

    if (codeToken.email !== email) {
      throw new CustomException(EMAIL_TOKEN_CONFIRMATION_INCORRECT);
    }

    if (codeToken.code !== code) {
      throw new CustomException(PHONE_NUMBER_CODE_CONFIRMATION_INCORRECT);
    }

    const payload = {
      countryCode,
      ddd,
      number,
      confirm: true,
    };

    this.cacheProvider.set({
      key: keyGetPhoneData,
      payload,
      ttl: CACHE_TTL.CLIENT_CREATE_SERVICE,
    });

    this.cacheProvider.delete(keyGetTokenData);
  }
}
