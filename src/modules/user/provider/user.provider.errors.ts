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

export const USER_PROVIDER_NOT_FOUND = {
  code: 1041,
  message: 'USER_PROVIDER_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const USER_CLIENT_CACHE_INFO_NOT_FOUND = {
  code: 1030,
  message: 'USER_CLIENT_CACHE_INFO_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const USER_ALREADY_PROVIDER_DISABLE = {
  code: 1039,
  message: 'USER_ALREADY_PROVIDER_DISABLE',
  statusCode: HttpStatusCode.BadRequest,
};

export const USER_TYPE_PROVIDER_ENABLE_NOT_FOUND = {
  code: 1040,
  message: 'USER_TYPE_PROVIDER_ENABLE_NOT_FOUND',
  statusCode: HttpStatusCode.BadRequest,
};

export const INVALID_INFO_PROVIDER_USER_ID = {
  code: 1042,
  message: 'INVALID_INFO_PROVIDER_USER_ID',
  statusCode: HttpStatusCode.BadRequest,
};

export const PROVIDER_NOT_BELONGS_TO_APPOINTMENT = {
  code: 1046,
  message: 'PROVIDER_NOT_BELONGS_TO_APPOINTMENT',
  statusCode: HttpStatusCode.NotFound,
};
