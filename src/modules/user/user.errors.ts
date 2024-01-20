import { HttpStatusCode } from 'axios';

export const USER_NOT_FOUND = {
  code: 1058,
  message: 'USER_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};
