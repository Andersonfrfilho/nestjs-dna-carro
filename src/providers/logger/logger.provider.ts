import { Logger as WinstonLogger } from 'winston';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerProviderInterface } from './logger.provider.interface';
import { deepClone } from './utils/deepClone';
import { obfuscatorObject } from './utils/obfuscator-object';

@Injectable()
export class LoggerProvider implements LoggerService, LoggerProviderInterface {
  private typeAcceptToFormats: string[];
  private requestId: string;
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private loggerWinston: WinstonLogger,
  ) {
    this.typeAcceptToFormats = ['number', 'string'];
  }
  setRequestId(requestId: string) {
    this.requestId = requestId;
  }

  error(message: any, ...optionalParams: any[]) {
    this.loggerWinston.error(message, {
      ...optionalParams,
      requestId: this.requestId,
    });
  }

  warn(message: any, ...optionalParams: any[]) {
    const obfuscatedParams = deepClone(optionalParams);
    obfuscatorObject(obfuscatedParams);
    this.loggerWinston.warn(message, {
      ...obfuscatedParams,
      requestId: this.requestId,
    });
  }

  log(message: any, ...optionalParams: any[]) {
    const obfuscatedParams = deepClone(optionalParams);
    obfuscatorObject(obfuscatedParams);
    this.loggerWinston.log(message, {
      ...obfuscatedParams,
      requestId: this.requestId,
    });
  }

  info(message: any, ...optionalParams: any[]) {
    const obfuscatedParams = deepClone(optionalParams);
    obfuscatorObject(obfuscatedParams);
    this.loggerWinston.log(message, {
      ...obfuscatedParams,
      requestId: this.requestId,
    });
  }
}
