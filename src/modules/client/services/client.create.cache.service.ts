import { Inject, Injectable } from '@nestjs/common';

import {
  CACHE_PROVIDER,
  CacheProviderInterface,
} from '@src/providers/cache/cache.provider.interface';
import { CACHE_KEYS } from '@src/providers/cache/constants/cache.constant.keys';
import { CACHE_TTL } from '@src/providers/cache/constants/cache.constant.ttl';
import { ClientCreateCacheServiceInterface } from '../interfaces/client.create.cache.service.interface';
import { ClientCacheCreateServiceParamsDTO } from '../dto/client.service.dto';

@Injectable()
export class ClientCreateCacheService
  implements ClientCreateCacheServiceInterface
{
  constructor(
    @Inject(CACHE_PROVIDER)
    private cacheProvider: CacheProviderInterface,
  ) {}
  async execute(params: ClientCacheCreateServiceParamsDTO): Promise<void> {
    const key = `${CACHE_KEYS.CLIENT_CREATE_SERVICE}:${params.user.email}:${params.key}`;
    await this.cacheProvider.set({
      key,
      payload: params,
      ttl: CACHE_TTL.CLIENT_CREATE_SERVICE,
    });
  }
}
