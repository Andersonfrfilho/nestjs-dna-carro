import { HttpStatusCode } from 'axios';

export const EMAIL_INFO_NOT_FOUND = {
  code: 1026,
  message: 'EMAIL_INFO_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const PHONE_INFO_NOT_FOUND = {
  code: 1029,
  message: 'PHONE_INFO_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const KEY_PARAM_INVALID = {
  code: 1027,
  message: 'KEY_PARAM_INVALID',
  statusCode: HttpStatusCode.BadRequest,
};

export const USER_EMAIL_NOT_FOUND = {
  code: 1028,
  message: 'EMAIL_INFO_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const USER_NOT_FOUND = {
  code: 1029,
  message: 'USER_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const USER_CLIENT_CACHE_INFO_NOT_FOUND = {
  code: 1030,
  message: 'USER_CLIENT_CACHE_INFO_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};
