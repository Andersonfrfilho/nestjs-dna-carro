import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@src/config';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CACHE_PROVIDER } from './cache.provider.interface';
import { CacheProvider } from './cache.provider';
interface ParamsDto {
  ttl: number;
}
@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (_: ConfigService & ParamsDto) => ({
        store: await redisStore({
          socket: {
            host: config.cache.host,
            port: config.cache.port,
          },
          password: config.cache.password,
        }),
      }),
      inject: [ConfigService],
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
