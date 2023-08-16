import { Logger as WinstonLogger } from 'winston';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerProviderInterface } from './logger.provider.interface';
import { obfuscatorObject } from '@src/utils/obfuscator-object';
import { inspect } from 'util';

@Injectable()
export class LoggerProvider implements LoggerService, LoggerProviderInterface {
  typeAcceptToFormats: string[];
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private loggerWinston: WinstonLogger,
  ) {
    this.typeAcceptToFormats = ['number', 'string'];
  }

  error(message: any, ...optionalParams: any[]) {
    obfuscatorObject(optionalParams);

    this.loggerWinston.error(message, optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    obfuscatorObject(optionalParams);
    this.loggerWinston.warn(message, optionalParams);
  }
  log(message: any, ...optionalParams: any[]) {
    obfuscatorObject(optionalParams);
    this.loggerWinston.log(message, optionalParams);
  }
  info(message: any, ...optionalParams: any[]) {
    obfuscatorObject(optionalParams);
    this.loggerWinston.info(message, optionalParams);
  }
}
