interface ClientCreateServiceParamsDto {
  email: string;
  key: string;
}
export const CACHE_KEYS = {
  CLIENT_CREATE_SERVICE: ({
    email,
    key,
  }: ClientCreateServiceParamsDto): string => `clients:create:${email}:${key}`,
};
