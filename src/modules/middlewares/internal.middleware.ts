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

type ExtendedRequest = Request & {
  user: {
    id: string;
  };
};

@Injectable()
export class UserInternalMiddleware implements NestMiddleware {
  constructor(
    @Inject(TOKEN_PROVIDER)
    private tokenProvider: TokenProviderInterface,
  ) {}
  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
      const bearerToken = req.headers.authorization;

      if (!bearerToken) {
        next(new CustomException(TOKEN_NOT_FOUND));
        return;
      }

      const [type, token] = bearerToken.split(' ');

      if (type !== BEARER_TOKEN_TYPE) {
        next(new CustomException(BEARER_TOKEN_MALFORMED));
        return;
      }

      const tokenData = await this.tokenProvider.verify({ token });

      if (!tokenData) {
        next(new CustomException(INVALID_TOKEN));
        return;
      }
      req.user = {
        id: tokenData.sub,
      };
      next();
    } catch (error) {
      next(error);
      return;
    }
  }
}
