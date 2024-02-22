import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { CustomException } from '@src/error/custom.exception';
import { Request, Response, NextFunction } from 'express';
import {
  BEARER_TOKEN_MALFORMED,
  INVALID_TOKEN,
  TOKEN_NOT_FOUND,
} from './middlewares.error';
import {
  TOKEN_PROVIDER,
  TokenProviderInterface,
} from '@src/providers/token/token.provider.interface';
import { BEARER_TOKEN_TYPE } from './middlewares.constant';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '../user/interfaces/repositories/user.repository.interface';
import {
  USER_INVALID_INFO,
  USER_IS_NOT_TYPE_REQUIRED,
  USER_NOT_FOUND,
} from '../common/common.error';
import { USER_TYPES } from '../common/enums/commons.user-types.enum';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

type ExtendedRequest = Request & {
  user: {
    id: string;
  };
};

@Injectable()
export class GetUserInternalIdMiddleware implements NestMiddleware {
  constructor(
    @Inject(TOKEN_PROVIDER)
    private tokenProvider: TokenProviderInterface,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepositoryInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
      const bearerToken = req.headers.authorization;

      if (!bearerToken) {
        this.loggerProvider.warn(
          'GetUserInternalIdMiddleware - token not found',
          {
            token: req.headers.authorization,
          },
        );
        next(new CustomException(TOKEN_NOT_FOUND));
        return;
      }

      const [type, token] = bearerToken.split(' ');

      if (type !== BEARER_TOKEN_TYPE) {
        this.loggerProvider.warn(
          'GetUserInternalIdMiddleware - invalid token',
          {
            token: req.headers.authorization,
          },
        );
        next(new CustomException(BEARER_TOKEN_MALFORMED));
        return;
      }

      const tokenData = await this.tokenProvider.verify({ token });

      if (!tokenData) {
        this.loggerProvider.warn(
          'GetUserInternalIdMiddleware - invalid token',
          {
            token: req.headers.authorization,
          },
        );
        next(new CustomException(INVALID_TOKEN));
        return;
      }
      const user = await this.userRepository.findByIdActiveWithTypes(
        tokenData.sub,
      );

      if (!user) {
        this.loggerProvider.warn(
          'GetUserInternalIdMiddleware - user not found',
          {
            token: req.headers.authorization,
          },
        );
        next(new CustomException(USER_NOT_FOUND));
        return;
      }

      if (
        !user.userTypesUsers ||
        (!!user.userTypesUsers && user.userTypesUsers.length === 0)
      ) {
        this.loggerProvider.warn(
          'GetUserInternalIdMiddleware - user invalid info',
          {
            token: req.headers.authorization,
          },
        );
        next(new CustomException(USER_INVALID_INFO));
        return;
      }

      const isProvider = user.userTypesUsers.some(
        (types) =>
          !!types.typesUsersTypes &&
          types.typesUsersTypes.name === USER_TYPES.PROVIDER &&
          types.typesUsersTypes.active,
      );

      if (!isProvider) {
        this.loggerProvider.warn(
          'GetUserInternalIdMiddleware - user is not a provider',
          {
            token: req.headers.authorization,
          },
        );
        next(
          new CustomException(USER_IS_NOT_TYPE_REQUIRED(USER_TYPES.PROVIDER)),
        );
        return;
      }

      req.user = {
        id: tokenData.sub,
      };
      next();
    } catch (error) {
      this.loggerProvider.error('GetUserInternalIdMiddleware - use', error);
      next(error);
      return;
    }
  }
}
