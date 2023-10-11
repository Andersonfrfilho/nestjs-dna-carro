import { Inject, Injectable } from '@nestjs/common';
import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';
import { CustomException } from '@src/error/custom.exception';

import { NameCacheKeyFlow, USER_CLIENT_CACHE_KEYS } from '../client.constant';
import {
  EMAIL_INFO_NOT_FOUND,
  USER_CLIENT_CACHE_INFO_NOT_FOUND,
} from '../client.errors';

import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';
import { ClientGetCacheInfoWithoutFlowByEmailServiceInterface } from '../interfaces/client.get-cache-info-without-flow-by-email.interface';
import { ClientCacheCreateServiceParamsDto } from '../dto/client.create.cache.dto';
import {
  ClientGetCacheInfoWithoutFlowByEmailDtoServiceParamsDto,
  ClientGetCacheInfoWithoutFlowByEmailServiceResponse,
} from '../dto/client.get-cache-info-without-flow-by-email.dto';

@Injectable()
export class ClientGetCacheInfoWithoutFlowByEmailService
  implements ClientGetCacheInfoWithoutFlowByEmailServiceInterface
{
  constructor(
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async execute(
    params: ClientGetCacheInfoWithoutFlowByEmailDtoServiceParamsDto,
  ): Promise<ClientGetCacheInfoWithoutFlowByEmailServiceResponse> {
    try {
      if (!params.email) {
        throw new CustomException(EMAIL_INFO_NOT_FOUND);
      }

      const key = USER_CLIENT_CACHE_KEYS.CLIENT_CREATE_SERVICE_ALL({
        email: params.email,
      });

      const userInfoCache =
        await this.cacheProvider.getAll<ClientCacheCreateServiceParamsDto>(key);

      if (!userInfoCache) {
        throw new CustomException(USER_CLIENT_CACHE_INFO_NOT_FOUND);
      }

      const keysFlow = Object.keys(NameCacheKeyFlow);
      const keysInfoCache = Object.keys(userInfoCache);

      const keysWithoutInfoCache = keysFlow.filter(
        (keyFlow) => !keysInfoCache.includes(keyFlow),
      );

      return {
        missingCacheInfo: keysWithoutInfoCache,
      };
    } catch (error) {
      this.loggerProvider.error(
        'ClientGetCacheInfoWithoutFlowByEmailService - execute - error',
        {
          error: error,
        },
      );

      throw error;
    }
  }
}
