import config from '@src/config';

export const EXPIRE_IN_TOKEN_SEND_CODE = '15m';
export const EXPIRE_IN_TOKEN_SEND_CODE_TTL = 60 * 15;
export const NUMBER_POSSIBLE_ATTEMPTS_CONFIRMATION_NUMBER =
  config.api.phone.numberPossibleAttempts;
interface ParamsDto {
  phone: string;
}

export const PHONE_CACHE_KEYS = {
  PHONE_SEND_VERIFY_CODE: ({ phone }: ParamsDto): string =>
    `phone:send:${phone}`,
};
