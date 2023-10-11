import { CacheTtl } from '@src/providers/cache/cache.interface';

export enum NameCacheKeyFlow {
  user = 'user',
  phone = 'phone',
  address = 'address',
  term = 'term',
  image = 'image',
}

interface ParamsDto {
  email: string;
}
interface ClientCreateServiceParamsDto extends ParamsDto {
  key: NameCacheKeyFlow;
}

export const USER_CLIENT_CACHE_KEYS = {
  CLIENT_CREATE_SERVICE_KEY: ({
    email,
    key,
  }: ClientCreateServiceParamsDto): string => `clients:create:${email}:${key}`,
  CLIENT_CREATE_SERVICE_ALL: ({ email }: ParamsDto): string =>
    `clients:create:${email}:*`,
  PHONE_SEND_VERIFY_CODE: ({ email }: ParamsDto): string =>
    `phone:send:${email}`,
};

export const USER_CLIENT_CACHE_TTL: CacheTtl = {
  CREATE_SERVICE: 1000 * 60 * 30,
};
