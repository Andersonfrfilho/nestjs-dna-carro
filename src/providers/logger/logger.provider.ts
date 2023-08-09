import { Logger as WinstonLogger } from 'winston';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerProvider implements LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private loggerWinston: WinstonLogger,
  ) {}
  error(message: any, ...optionalParams: any[]) {
    this.loggerWinston.error(message, optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.loggerWinston.warn(message, optionalParams);
  }
  log(message: any, ...optionalParams: any[]) {
    this.loggerWinston.log(message, optionalParams);
  }
  info(message: any, ...optionalParams: any[]) {
    this.loggerWinston.log(message, optionalParams);
  }
}
