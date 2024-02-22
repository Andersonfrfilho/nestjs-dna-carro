import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetRequestUrl = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const url = request.url;
    return url;
  },
);
