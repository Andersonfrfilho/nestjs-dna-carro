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
import {
  NameCacheKeyFlow,
  USER_CLIENT_CACHE_KEYS,
  USER_CLIENT_CACHE_TTL,
} from '@src/modules/user/client/client.constant';
import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';
import { PhoneAttribute } from '../dto/phone.dto';
import { CustomException } from '@src/error/custom.exception';
import {
  CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND,
  CACHE_TOKEN_CONFIRMATION_PHONE_NOT_FOUND,
  EMAIL_TOKEN_CONFIRMATION_INCORRECT,
  PHONE_NUMBER_CACHE_CONFLICT_INFO,
  PHONE_NUMBER_CODE_CONFIRMATION_INCORRECT,
  PHONE_TOKEN_CONFIRMATION_INCORRECT,
} from '../phone.error';
import { PHONE_CACHE_KEYS } from '../phone.constant';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

@Injectable()
export class PhoneVerifyCodeConfirmationCreateClientService
  implements PhoneVerifyCodeConfirmationCreateClientServiceInterface
{
  constructor(
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
    @Inject(TOKEN_PROVIDER)
    private tokenProvider: TokenProviderInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute({
    code,
    countryCode,
    ddd,
    number,
  }: PhoneVerifyCodeConfirmationCreateClientServiceParamsDto): Promise<void> {
    try {
      const phoneNumber = `${countryCode}${ddd}${number}`;
      const keyGetPhoneData = USER_CLIENT_CACHE_KEYS.CLIENT_CREATE_SERVICE_KEY({
        phone: phoneNumber,
        key: NameCacheKeyFlow.phone,
      });

      const cachePhoneData = await this.cacheProvider.get<PhoneAttribute>(
        keyGetPhoneData,
      );

      if (!cachePhoneData) {
        throw new CustomException(CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND);
      }

      const {
        countryCode: countryCodeCache,
        ddd: dddCache,
        number: numberCache,
        numberAttempts,
      } = cachePhoneData.phone;

      if (
        countryCode !== countryCodeCache &&
        ddd !== dddCache &&
        number !== numberCache
      ) {
        throw new CustomException(PHONE_NUMBER_CACHE_CONFLICT_INFO);
      }

      const keyGetTokenData = USER_CLIENT_CACHE_KEYS.PHONE_SEND_VERIFY_CODE({
        phone: phoneNumber,
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

      if (codeToken.phone !== phoneNumber) {
        throw new CustomException(PHONE_TOKEN_CONFIRMATION_INCORRECT);
      }

      const payload = {
        countryCode,
        ddd,
        number,
        confirm: false,
        numberAttempts: String((numberAttempts && numberAttempts + 1) || 1),
      };

      if (codeToken.code !== code) {
        await this.cacheProvider.set({
          key: keyGetPhoneData,
          payload: { phone: payload },
          ttl: USER_CLIENT_CACHE_TTL.CREATE_SERVICE,
        });
        throw new CustomException(PHONE_NUMBER_CODE_CONFIRMATION_INCORRECT);
      }

      payload.confirm = true;

      await this.cacheProvider.set({
        key: keyGetPhoneData,
        payload: { phone: payload },
        ttl: USER_CLIENT_CACHE_TTL.CREATE_SERVICE,
      });

      await this.cacheProvider.delete(keyGetTokenData);
    } catch (error) {
      this.loggerProvider.error(
        'PhoneVerifyCodeConfirmationCreateClientService - execute - error',
        {
          error: error.message,
        },
      );

      throw error;
    }
  }
}
