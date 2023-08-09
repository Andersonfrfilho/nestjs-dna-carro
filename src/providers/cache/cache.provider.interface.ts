import { GetParamsDTO } from '@providers/cache/cache.dto';

export const CACHE_PROVIDER = 'CACHE_PROVIDER';
export interface CacheProviderInterface {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(payload: GetParamsDTO<T>): Promise<void>;
}
