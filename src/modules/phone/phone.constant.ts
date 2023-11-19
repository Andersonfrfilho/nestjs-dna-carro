import config from '@src/config';

export const EXPIRE_IN_TOKEN_SEND_CODE = '3m';
export const EXPIRE_IN_TOKEN_SEND_CODE_TTL = 1000 * 60 * 3;
export const EXPIRE_IN_TOKEN_SEND_CODE_MILLISECONDS = 1000 * 60 * 3;
export const NUMBER_POSSIBLE_ATTEMPTS_CONFIRMATION_NUMBER =
  config.api.phone.numberPossibleAttempts;
interface ParamsDto {
  phone: string;
}

export const PHONE_CACHE_KEYS = {
  PHONE_SEND_VERIFY_CODE: ({ phone }: ParamsDto): string =>
    `phone:${phone}:send:code`,
};
