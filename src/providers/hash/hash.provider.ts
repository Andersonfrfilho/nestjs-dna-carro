import { Inject, Injectable } from '@nestjs/common';
import { HashProviderInterface } from './hash.provider.interface';
import * as bcrypt from 'bcrypt';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '../logger/logger.provider.interface';
import { CustomException } from '@src/error/custom.exception';
import { HASH_ERROR } from './hash.error';
import config from '@src/config';
import { CompareParamsDto } from './hash.dto';

@Injectable()
export class HashProvider implements HashProviderInterface {
  private secret: string;
  constructor(
    @Inject(LOGGER_PROVIDER)
    private readonly loggerProvider: LoggerProviderInterface,
  ) {}
  async compare({ hash, value }: CompareParamsDto): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(value, hash);
      return isMatch;
    } catch (error) {
      this.loggerProvider.error('HashProvider - compare', {
        error,
      });
      throw new CustomException(HASH_ERROR);
    }
  }

  async hash(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      const hashResult = await bcrypt.hash(password, salt);
      return hashResult;
    } catch (error) {
      console.log(error);
      this.loggerProvider.error('HashProvider - hash', {
        error,
      });
      throw new CustomException(HASH_ERROR);
    }
  }
}
