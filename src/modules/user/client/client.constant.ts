import { CacheTtl } from '@src/providers/cache/cache.interface';

export enum NameCacheKeyFlow {
  user = 'user',
  phone = 'phone',
  phoneConfirmation = 'phone:confirmation',
  address = 'address',
  term = 'term',
  image = 'image',
}
export const NameCacheKeyFlowPhoneConfirmation = 'phoneConfirmation';
interface ParamsDto {
  phone: string;
}
interface ClientCreateServiceParamsDto extends ParamsDto {
  key: NameCacheKeyFlow;
}

export const USER_CLIENT_CACHE_KEYS = {
  CLIENT_CREATE_SERVICE_KEY: ({
    phone,
    key,
  }: ClientCreateServiceParamsDto): string => `clients:create:${phone}:${key}`,
  CLIENT_CREATE_SERVICE_ALL: ({ phone }: ParamsDto): string =>
    `clients:create:${phone}:*`,
  PHONE_SEND_VERIFY_CODE: ({ phone }: ParamsDto): string =>
    `phone:${phone}:send:code:confirmation`,
};

export const USER_CLIENT_CACHE_TTL: CacheTtl = {
  CREATE_SERVICE: 1000 * 60 * 30,
};
