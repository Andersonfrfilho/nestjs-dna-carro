import { Inject, Injectable } from '@nestjs/common';

import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';
import { ClientCreateCacheServiceInterface } from '../interfaces/client.create.cache.interface';
import { ClientCacheCreateServiceParamsDto } from '../dto/client.create.cache.dto';
import { CustomException } from '@src/error/custom.exception';
import { KEY_PARAM_INVALID, PHONE_INFO_NOT_FOUND } from '../client.errors';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '@src/modules/user/interfaces/repositories/user.repository.interface';
import { EMAIL_ALREADY_EXIST } from '@src/error/error.constant';
import {
  NameCacheKeyFlow,
  USER_CLIENT_CACHE_KEYS,
  USER_CLIENT_CACHE_TTL,
} from '../client.constant';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

@Injectable()
export class ClientCreateCacheService
  implements ClientCreateCacheServiceInterface
{
  constructor(
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(params: ClientCacheCreateServiceParamsDto): Promise<void> {
    try {
      const phone = params?.phone;
      if (!phone) {
        throw new CustomException(PHONE_INFO_NOT_FOUND);
      }

      const user = await this.userRepository.findByPhoneActiveUser(phone);

      if (user) {
        throw new CustomException(EMAIL_ALREADY_EXIST);
      }

      const keyPhone = `${phone.countryCode}${phone.ddd}${phone.number}`;

      const key = USER_CLIENT_CACHE_KEYS.CLIENT_CREATE_SERVICE_KEY({
        phone: keyPhone,
        key: params.key,
      });

      if (!Object.values(NameCacheKeyFlow).includes(params.key)) {
        throw new CustomException(KEY_PARAM_INVALID);
      }
      const typeKey = params.key;

      const data = params[typeKey];

      await this.cacheProvider.set({
        key,
        payload: { [typeKey]: data },
        ttl: USER_CLIENT_CACHE_TTL.CREATE_SERVICE,
      });
    } catch (error) {
      this.loggerProvider.error('ClientCreateCacheService - execute - error', {
        error: error.message,
      });

      throw error;
    }
  }
}
