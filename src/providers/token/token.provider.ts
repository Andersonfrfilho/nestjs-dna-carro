import { Inject, Injectable } from '@nestjs/common';
import {
  TokenProviderInterface,
  TokenAssignParamsPayloadDto,
} from './token.provider.interface';
import config from '@src/config';
import {
  TokenProviderAssignParamsDto,
  TokenProviderVerifyParamsDto,
} from './token.dto';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '../logger/logger.provider.interface';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from '@src/error/custom.exception';
import { TOKEN_ERROR } from './token.error';
@Injectable()
export class TokenProvider implements TokenProviderInterface {
  private secret: string;
  constructor(
    @Inject(LOGGER_PROVIDER)
    private readonly loggerProvider: LoggerProviderInterface,
    private jwtService: JwtService,
  ) {
    this.secret = config.token.secret;
  }
  async verify<T>({ token }: TokenProviderVerifyParamsDto): Promise<T> {
    try {
      const payload = await this.jwtService.verifyAsync<any>(token, {
        secret: this.secret,
      });
      return payload as unknown as T;
    } catch (error) {
      this.loggerProvider.error('TokenProvider - verify', {
        error,
      });
      throw new CustomException(TOKEN_ERROR);
    }
  }

  async assign<T>({
    expiresIn,
    payloadParams,
  }: TokenProviderAssignParamsDto<
    T & TokenAssignParamsPayloadDto
  >): Promise<string> {
    const { id, email, ...rest } = payloadParams;
    const payload = { sub: id, email: email, ...rest };
    try {
      const token = await this.jwtService.signAsync(payload, { expiresIn });
      return token;
    } catch (error) {
      this.loggerProvider.error('TokenProvider - verify', {
        error,
      });
      throw new CustomException(TOKEN_ERROR);
    }
  }
}
