import { Inject } from '@nestjs/common';
import { GetParamsDto } from './cache.dto';
import { CacheProviderInterface } from './cache.provider.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import config from '@src/config';
import { CustomException } from '@src/error/custom.exception';
import { CACHE_GET_ERROR } from './cache.error';

export class CacheProvider implements CacheProviderInterface {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}
  async delete(key: string): Promise<void> {
    try {
      await this.cacheService.del(key);
    } catch (err) {
      throw new CustomException(CACHE_GET_ERROR);
    }
  }

  async get<T>(key: string): Promise<T | undefined> {
    try {
      const data = await this.cacheService.get<T>(key);

      return JSON.parse(data as unknown as string) as T;
    } catch (err) {
      throw new CustomException(CACHE_GET_ERROR);
    }
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
