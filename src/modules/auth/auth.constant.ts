export const AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE = '15m';
export const AUTH_EXPIRE_IN_TOKEN_FORGOT_PASSWORD_PHONE_CODE_TTL =
  1000 * 60 * 15;

export const AUTH_CACHE_KEYS = {
  PHONE_SEND_FORGOT_PASSWORD_PHONE_CODE: (email: string): string =>
    `auth:send:forgot:password:phone:code:user:${email}`,
};

export const AUTH_FORGOT_PASSWORD_PHONE_CODE_SEND_SMS_MESSAGE = (
  code: string,
): string =>
  `Use o código para redefinir sua senha DnA-Carro\nseu código de reset de senha é: ${code}`;
