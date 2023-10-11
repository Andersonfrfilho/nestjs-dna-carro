import { HttpStatusCode } from 'axios';

export const USER_NOT_FOUND = {
  code: 1014,
  message: 'USER_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const INVALID_PASSWORD = {
  code: 1015,
  message: 'INVALID_PASSWORD',
  statusCode: HttpStatusCode.Forbidden,
};

export const MAX_ATTEMPT_TRY_FORGOT_PASSWORD_VERIFY_PHONE_CODE = {
  code: 1016,
  message: 'MAX_ATTEMPT_TRY_FORGOT_PASSWORD_VERIFY_PHONE_CODE',
  statusCode: HttpStatusCode.Forbidden,
};
export const FORGOT_PASSWORD_PHONE_VERIFY_CODE_INCORRECT = {
  code: 1017,
  message: 'FORGOT_PASSWORD_PHONE_VERIFY_CODE_INCORRECT',
  statusCode: HttpStatusCode.Forbidden,
};

export const PASSWORD_CONFIRMATION_NOT_IDENTICAL = {
  code: 1018,
  message: 'PASSWORD_CONFIRMATION_NOT_IDENTICAL',
  statusCode: HttpStatusCode.Forbidden,
};
