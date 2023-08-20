import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { LOGGER_PROVIDER } from './logger.provider.interface';
import { LoggerProvider } from './logger.provider';
import { winstonConfig } from './logger.config';
import { LoggerRequestInterceptor } from './logger.request.interceptor';
import { LoggerResponseInterceptor } from './logger.response.interceptor';

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
      useClass: LoggerResponseInterceptor,
    },
  ],
  exports: [LOGGER_PROVIDER],
})
export class LoggerModule {}
