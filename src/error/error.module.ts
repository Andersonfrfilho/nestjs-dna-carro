import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from '@src/providers/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class ErrorModule {}
