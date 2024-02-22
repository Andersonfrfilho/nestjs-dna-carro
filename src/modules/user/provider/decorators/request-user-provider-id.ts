import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomException } from '@src/error/custom.exception';
import { INVALID_INFO_PROVIDER_USER_ID } from '../user.provider.errors';

export const RequestUserProviderId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest().raw;

    const userId = request?.user?.id;
    if (!userId) {
      throw new CustomException(INVALID_INFO_PROVIDER_USER_ID);
    }
    return userId;
  },
);
