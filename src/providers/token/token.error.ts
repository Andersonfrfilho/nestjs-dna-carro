import { HttpStatusCode } from 'axios';

export const TOKEN_ERROR = {
  code: 1017,
  message: 'TOKEN_ERROR',
  statusCode: HttpStatusCode.BadRequest,
};
