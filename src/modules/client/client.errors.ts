import { HttpStatusCode } from 'axios';

export const EMAIL_INFO_NOT_FOUND = {
  code: 1008,
  message: 'EMAIL_INFO_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const KEY_PARAM_INVALID = {
  code: 1010,
  message: 'KEY_PARAM_INVALID',
  statusCode: HttpStatusCode.BadRequest,
};
