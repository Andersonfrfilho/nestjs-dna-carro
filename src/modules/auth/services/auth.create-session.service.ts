import { Inject, Injectable } from '@nestjs/common';
import { AuthCreateSessionServiceInterface } from '../interfaces/auth.create-session.interface';
import {
  AuthCreateSessionServiceParamsDto,
  AuthCreateSessionServiceResponse,
} from '../dtos/auth.create-session.dto';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '@src/modules/user/interfaces/repositories/user.repository.interface';
import { CustomException } from '@src/error/custom.exception';
import { INVALID_PASSWORD, USER_NOT_FOUND } from '../auth.error';
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
import { separatedCharacterNumber } from '@src/utils/separated-character-number';
import { NameSessionTypeFlow } from '../auth.constant';
import { separatePhoneInComponent } from '@src/utils/separatePhoneInComponent.util';
import { User } from '@src/modules/user/entities/user.entity';

@Injectable()
export class AuthCreateSessionService
  implements AuthCreateSessionServiceInterface
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
    params: AuthCreateSessionServiceParamsDto,
  ): Promise<AuthCreateSessionServiceResponse> {
    try {
      const userIdentifier = params.user;
      const userType = params.type;
      let user: User | null = null;
      switch (userType) {
        case NameSessionTypeFlow.phone:
          user = await this.userRepository.findByPhoneActiveUser(
            separatePhoneInComponent(userIdentifier),
          );
          break;
        case NameSessionTypeFlow.email:
          user = await this.userRepository.findByEmailActive(userIdentifier);
          break;
        default:
          user = await this.userRepository.findByDocumentActive({
            document: userIdentifier,
            documentType: userType,
          });
          break;
      }

      if (!user) {
        throw new CustomException(USER_NOT_FOUND);
      }
      const { password } = params;

      const isValidPassword = await this.hashProvider.compare({
        value: password,
        hash: user.password_hash,
      });

      if (!isValidPassword) {
        throw new CustomException(INVALID_PASSWORD);
      }

      const { id } = user;

      const token = await this.tokenProvider.assign({
        expiresIn: config.token.expireIn,
        payloadParams: { id },
      });

      const refreshToken = await this.tokenProvider.assign({
        expiresIn: config.token.expireInRefresh,
        payloadParams: { id },
      });

      const date = new Date();

      // const [symbolExpireIn, numberExpireIn] = separatedCharacterNumber(
      //   config.token.expireIn,
      // );
      const symbolExpireIn = 's';
      const numberExpireIn = '1';
      const expireInUnix = moment(date)
        .add(numberExpireIn, symbolExpireIn as any)
        .valueOf();

      // const [symbolRefreshExpireIn, numberRefreshExpireIn] =
      //   separatedCharacterNumber(config.token.expireInRefresh);

      const symbolRefreshExpireIn = 's';
      const numberRefreshExpireIn = '1';

      const expireInRefreshTokenUnix = moment(date)
        .add(numberRefreshExpireIn, symbolRefreshExpireIn as any)
        .valueOf();

      return {
        token,
        refreshToken,
        expireIn: expireInUnix as any,
        expireInRefreshToken: expireInRefreshTokenUnix as any,
      };
    } catch (error) {
      this.loggerProvider.error('AuthCreateSessionService - execute - error', {
        error: error.message,
      });

      throw error;
    }
  }
}
