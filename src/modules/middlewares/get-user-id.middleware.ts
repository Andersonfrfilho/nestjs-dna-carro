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
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

type ExtendedRequest = Request & {
  user: {
    id: string;
  };
};

@Injectable()
export class GetUserIdMiddleware implements NestMiddleware {
  constructor(
    @Inject(TOKEN_PROVIDER)
    private tokenProvider: TokenProviderInterface,
    @Inject(LOGGER_PROVIDER)
    private loggerProvider: LoggerProviderInterface,
  ) {}
  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
      this.loggerProvider.info('GetUserIdMiddleware - use', {
        token: req.headers.authorization,
      });

      const bearerToken = req.headers.authorization;

      if (!bearerToken) {
        this.loggerProvider.warn('GetUserIdMiddleware - token not found', {
          token: req.headers.authorization,
        });
        next(new CustomException(TOKEN_NOT_FOUND));
        return;
      }

      const [type, token] = bearerToken.split(' ');

      if (type !== BEARER_TOKEN_TYPE) {
        this.loggerProvider.warn('GetUserIdMiddleware - invalid token', {
          token: req.headers.authorization,
        });
        next(new CustomException(BEARER_TOKEN_MALFORMED));
        return;
      }

      const tokenData = await this.tokenProvider.verify({ token });

      if (!tokenData) {
        this.loggerProvider.warn('GetUserIdMiddleware - invalid token', {
          token: req.headers.authorization,
        });
        next(new CustomException(INVALID_TOKEN));
        return;
      }
      req.user = {
        id: tokenData.sub,
      };
      next();
    } catch (error) {
      this.loggerProvider.error('GetUserIdMiddleware - use - error', {
        error,
      });
      next(error);
      return;
    }
  }
}
