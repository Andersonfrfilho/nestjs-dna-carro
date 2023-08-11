import { ErrorModule } from './error/error.module';
import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './providers/database/database.module';
import { ClientModule } from './modules/client/client.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheClientModule } from './providers/cache/cache.module';
import { ConfigEnvsModule } from './config/config.module';
import { LoggerModule } from './providers/logger/logger.module';

@Module({
  imports: [
    ErrorModule,
    LoggerModule,
    ConfigEnvsModule,
    CacheClientModule,
    DatabaseModule,
    HealthModule,
    ClientModule,
    AuthModule,
    LoggerModule,
  ],
})
export class AppModule {}
