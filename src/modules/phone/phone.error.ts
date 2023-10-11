import { HttpStatusCode } from 'axios';

export const CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND = {
  code: 1019,
  message: 'CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND',
  statusCode: HttpStatusCode.BadRequest,
};

export const PHONE_NUMBER_CACHE_CONFLICT_INFO = {
  code: 1020,
  message: 'PHONE_NUMBER_CACHE_CONFLICT_INFO',
  statusCode: HttpStatusCode.BadRequest,
};

export const CACHE_TOKEN_CONFIRMATION_PHONE_NOT_FOUND = {
  code: 1021,
  message: 'CACHE_DATA_CONFIRMATION_PHONE_NOT_FOUND',
  statusCode: HttpStatusCode.BadRequest,
};

export const PHONE_NUMBER_CODE_CONFIRMATION_INCORRECT = {
  code: 1022,
  message: 'PHONE_NUMBER_CODE_CONFIRMATION_INCORRECT',
  statusCode: HttpStatusCode.BadRequest,
};

export const EMAIL_TOKEN_CONFIRMATION_INCORRECT = {
  code: 1023,
  message: 'EMAIL_TOKEN_CONFIRMATION_INCORRECT',
  statusCode: HttpStatusCode.BadRequest,
};

export const EXCESSIVE_TRY_CODE_PHONE_CONFIRMATION = {
  code: 1024,
  message: 'EXCESSIVE_TRY_CODE_PHONE_CONFIRMATION',
  statusCode: HttpStatusCode.BadRequest,
};
