import { Inject, Injectable } from '@nestjs/common';

import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '@src/modules/user/interfaces/repositories/user.repository.interface';
import { CustomException } from '@src/error/custom.exception';
import { USER_NOT_FOUND } from '../auth.error';
import {
  HASH_PROVIDER,
  HashProviderInterface,
} from '@src/providers/hash/hash.provider.interface';
import {
  TOKEN_PROVIDER,
  TokenProviderInterface,
} from '@src/providers/token/token.provider.interface';
import config from '@src/config';
import * as moment from 'moment';
import { separatedCharacterNumber } from '@src/utils/separeted-character-number';
import { AuthRenewRefreshTokenServiceInterface } from '../interfaces/auth.renew-refresh-token.interface';
import {
  AuthRenewRefreshTokenServiceParamsDto,
  AuthRenewRefreshTokenServiceResponse,
  AuthTokenPayloadDto,
} from '../dtos/auth.renew-refresh-token.dto';

@Injectable()
export class AuthRenewRefreshTokenService
  implements AuthRenewRefreshTokenServiceInterface
{
  constructor(
    @Inject(LOGGER_PROVIDER) private loggerProvider: LoggerProviderInterface,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepositoryInterface,
    @Inject(HASH_PROVIDER)
    private hashProvider: HashProviderInterface,
    @Inject(TOKEN_PROVIDER)
    private tokenProvider: TokenProviderInterface,
  ) {}
  async execute(
    params: AuthRenewRefreshTokenServiceParamsDto,
  ): Promise<AuthRenewRefreshTokenServiceResponse> {
    try {
      const { refreshToken } = params;

      const { email, sub: id } =
        await this.tokenProvider.verify<AuthTokenPayloadDto>({
          token: refreshToken,
        });

      const user = await this.userRepository.findByIdActive(id);

      if (!user) {
        throw new CustomException(USER_NOT_FOUND);
      }

      const renewToken = await this.tokenProvider.assign({
        expiresIn: config.token.expireIn,
        payloadParams: { id, email },
      });

      const renewRefreshToken = await this.tokenProvider.assign({
        expiresIn: config.token.expireInRefresh,
        payloadParams: { id, email },
      });

      const date = new Date();

      const [symbolExpireIn, numberExpireIn] = separatedCharacterNumber(
        config.token.expireIn,
      );
      console.log(symbolExpireIn, numberExpireIn);
      const expireInUnix = moment(date)
        .add(numberExpireIn, symbolExpireIn as any)
        .unix();

      const [symbolRefreshExpireIn, numberRefreshExpireIn] =
        separatedCharacterNumber(config.token.expireInRefresh);

      const expireInRefreshTokenUnix = moment(date)
        .add(numberRefreshExpireIn, symbolRefreshExpireIn as any)
        .unix();

      return {
        token: renewToken,
        refreshToken: renewRefreshToken,
        expireIn: expireInUnix,
        expireInRefreshToken: expireInRefreshTokenUnix,
      };
    } catch (error) {
      this.loggerProvider.error(
        'AuthRenewRefreshTokenService - execute - error',
        {
          error,
        },
      );

      throw error;
    }
  }
}
