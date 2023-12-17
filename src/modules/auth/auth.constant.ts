import { HttpStatusCode } from 'axios';

export enum NameSessionTypeFlow {
  email = 'email',
  phone = 'phone',
  cpf = 'cpf',
  cnpj = 'cnpj',
}

export const AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE = '3m';
export const AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE_TTL =
  1000 * 60 * 3;
export const AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE_RESET_PASSWORD_TTL =
  1000 * 60 * 15;

export const AUTH_CACHE_KEYS = {
  PHONE_SEND_FORGOT_PASSWORD_PHONE_CODE: (email: string): string =>
    `auth:send:forgot:password:phone:code:user:${email}`,
};

export const AUTH_FORGOT_PASSWORD_PHONE_CODE_SEND_SMS_MESSAGE = (
  code: string,
): string =>
  `Use o código para redefinir sua senha DnA-Carro\nseu código de reset de senha é: ${code}`;

export const CACHE_TOKEN_CONFIRMATION_PHONE_RESET_PASSWORD_NOT_FOUND = {
  code: 1012,
  message: 'CACHE_TOKEN_CONFIRMATION_PHONE_RESET_PASSWORD_NOT_FOUND',
  statusCode: HttpStatusCode.BadRequest,
};

export const CACHE_TOKEN_VALID_PHONE_RESET_PASSWORD = {
  code: 1013,
  message: 'CACHE_TOKEN_VALID_PHONE_RESET_PASSWORD',
  statusCode: HttpStatusCode.BadRequest,
};

export const NUMBER_MAX_ATTEMPT_VERIFY_CODE_RESET_PASSWORD = 3;
