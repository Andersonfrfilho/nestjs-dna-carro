import { Inject, Injectable } from '@nestjs/common';
import { TokenProviderInterface } from './token.provider.interface';
import config from '@src/config';
import { TokenProviderAssignParamsDto } from './token.dto';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '../logger/logger.provider.interface';

@Injectable()
export class TokenProvider implements TokenProviderInterface {
  private secret: string;
  constructor(
    @Inject(LOGGER_PROVIDER)
    private readonly loggerProvider: LoggerProviderInterface,
  ) {
    this.secret = config.token.secret;
  }
  assign<T>(data: TokenProviderAssignParamsDto<T>): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
