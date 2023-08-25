import { NameCacheKeyFlow } from '@src/modules/user/client/client.constant';

interface ParamsDto {
  email: string;
}
interface ClientCreateServiceParamsDto extends ParamsDto {
  key: NameCacheKeyFlow;
}

export const CACHE_KEYS = {
  CLIENT_CREATE_SERVICE: ({
    email,
    key,
  }: ClientCreateServiceParamsDto): string => `clients:create:${email}:${key}`,
  PHONE_SEND_VERIFY_CODE: ({ email }: ParamsDto): string =>
    `phone:send:${email}`,
};
