import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { LOGGER_PROVIDER } from './logger.provider.interface';
import { LoggerProvider } from './logger.provider';
import { winstonConfig } from './config';
import { LoggerRequestInterceptor } from './logger.request.interceptor';
import { TransformInterceptor } from './logger.response.interceptor';

@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  providers: [
    {
      provide: LOGGER_PROVIDER,
      useClass: LoggerProvider,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerRequestInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  exports: [LOGGER_PROVIDER],
})
export class LoggerModule {}
