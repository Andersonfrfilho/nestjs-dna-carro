import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomException } from '@src/error/custom.exception';
import { INVALID_INFO_USER_ID } from '@src/modules/common/common.error';

export const RequestUserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request?.user?.id;
    if (userId) {
      throw new CustomException(INVALID_INFO_USER_ID);
    }
    return userId;
  },
);
