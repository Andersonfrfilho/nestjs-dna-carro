import { CompareParamsDto } from './hash.dto';

export const HASH_PROVIDER = 'HASH_PROVIDER';

export interface HashProviderInterface {
  hash(data: string): Promise<string>;
  compare(data: CompareParamsDto): Promise<boolean>;
}
