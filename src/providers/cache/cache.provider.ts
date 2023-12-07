import { Inject } from '@nestjs/common';
import { GetParamsDto } from './cache.dto';
import { CacheProviderInterface } from './cache.provider.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import config from '@src/config';
import { CustomException } from '@src/error/custom.exception';
import { CACHE_GET_ERROR } from './cache.error';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '../logger/logger.provider.interface';

export class CacheProvider implements CacheProviderInterface {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    @Inject(LOGGER_PROVIDER) private loggerProvider: LoggerProviderInterface,
  ) {}
  async delete(key: string): Promise<void> {
    try {
      await this.cacheService.del(key);
    } catch (err) {
      this.loggerProvider.error('CacheProvider - delete', {
        error: err.message,
      });

      throw new CustomException(CACHE_GET_ERROR);
    }
  }

  async deleteAll(key: string): Promise<void> {
    try {
      const keys = await this.cacheService.store.keys(key);
      if (keys.length > 0) {
        await this.cacheService.store.mdel(...keys);
      }
    } catch (err) {
      this.loggerProvider.error('CacheProvider - delete', {
        error: err.message,
      });

      throw new CustomException(CACHE_GET_ERROR);
    }
  }

  async get<T>(key: string): Promise<T | undefined> {
    try {
      const data = await this.cacheService.get<T>(key);
      return data && (JSON.parse(data as unknown as string) as T);
    } catch (err) {
      this.loggerProvider.error('CacheProvider - get', {
        error: err.message,
      });

      throw new CustomException(CACHE_GET_ERROR);
    }
  }

  async getAll<T>(key: string): Promise<T | undefined> {
    try {
      const keys = await this.cacheService.store.keys(key);
      const valuesPromise = await this.cacheService.store.mget(...keys);
      const formattedObject = valuesPromise.reduce(
        (accumulator: any, element: string) => {
          const object = JSON.parse(element);
          return { ...accumulator, ...object };
        },
        {},
      );
      return formattedObject as T;
    } catch (err) {
      this.loggerProvider.error('CacheProvider - get', {
        error: err.message,
      });

      throw new CustomException(CACHE_GET_ERROR);
    }
  }

  async set<T>({
    key,
    payload,
    ttl = config.cache.ttl,
  }: GetParamsDto<T>): Promise<void> {
    try {
      const convertPayloadToString = JSON.stringify(payload);
      await this.cacheService.set(key, convertPayloadToString, ttl);
    } catch (error) {
      this.loggerProvider.error('CacheProvider - set', {
        error: error.message,
      });

      throw new CustomException(CACHE_GET_ERROR);
    }
  }
}
