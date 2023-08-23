export const EXPIRE_IN_TOKEN_SEND_CODE = 1000 * 60 * 15;
export const EXPIRE_IN_TOKEN_SEND_CODE_TTL = EXPIRE_IN_TOKEN_SEND_CODE;
interface ParamsDto {
  email: string;
}

export const PHONE_CACHE_KEYS = {
  PHONE_SEND_VERIFY_CODE: ({ email }: ParamsDto): string =>
    `phone:send:${email}`,
};
