type Milliseconds = number;

interface CacheTtl {
  [key: string]: Milliseconds;
}
export const CACHE_TTL: CacheTtl = {
  CLIENT_CREATE_SERVICE: 1000 * 60 * 30,
};
