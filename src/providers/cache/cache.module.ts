import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import config from '@src/config';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CACHE_PROVIDER } from './cache.provider.interface';
import { CacheProvider } from './cache.provider';
import { LoggerModule } from '../logger/logger.module';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '../logger/logger.provider.interface';
interface ParamsDto {
  ttl: number;
}
@Module({
  imports: [
    LoggerModule,
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [LoggerModule],
      inject: [LOGGER_PROVIDER],
      useFactory: async (
        loggerProvider: LoggerProviderInterface & ParamsDto,
      ) => {
        try {
          const store = await redisStore({
            socket: {
              host: config.cache.host,
              port: config.cache.port,
            },
            password: config.cache.password,
          });
          return {
            store,
          };
        } catch (error) {
          loggerProvider.error('Initialized connection cache module', {
            error: error.message,
          });
          throw error;
        }
      },
    }),
  ],
  providers: [
    {
      provide: CACHE_PROVIDER,
      useClass: CacheProvider,
    },
  ],
  exports: [CACHE_PROVIDER],
})
export class CacheClientModule {}
