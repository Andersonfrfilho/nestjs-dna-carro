import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './providers/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheClientModule } from './providers/cache/cache.module';
import { ConfigEnvsModule } from './config/config.module';
import { LoggerModule } from './providers/logger/logger.module';
import { ClientModule } from './modules/user/client/client.module';
import { AddressModule } from './modules/address/address.module';
import { UserProviderModule } from './modules/user/provider/user.provider.module';

@Module({
  imports: [
    LoggerModule,
    ConfigEnvsModule,
    CacheClientModule,
    DatabaseModule,
    HealthModule,
    ClientModule,
    AuthModule,
    LoggerModule,
    AddressModule,
    UserProviderModule,
  ],
})
export class AppModule {}
