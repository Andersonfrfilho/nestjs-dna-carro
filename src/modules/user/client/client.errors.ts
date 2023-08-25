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

export const USER_EMAIL_NOT_FOUND = {
  code: 1008,
  message: 'EMAIL_INFO_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const USER_NOT_FOUND = {
  code: 1008,
  message: 'USER_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};
