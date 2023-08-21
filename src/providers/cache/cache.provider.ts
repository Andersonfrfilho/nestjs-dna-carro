import { Inject } from '@nestjs/common';
import { GetParamsDto } from './cache.dto';
import { CacheProviderInterface } from './cache.provider.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import config from '@src/config';

export class CacheProvider implements CacheProviderInterface {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}
  async get<T>(key: string): Promise<T | undefined> {
    return this.cacheService.get<T>(key);
  }
  async set<T>({
    key,
    payload,
    ttl = config.cache.ttl,
  }: GetParamsDto<T>): Promise<void> {
    const convertPayloadToString = JSON.stringify(payload);
    await this.cacheService.set(key, convertPayloadToString, ttl);
  }
}
