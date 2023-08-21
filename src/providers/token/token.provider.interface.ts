import { TokenProviderAssignParamsDto } from './token.dto';

export const TOKEN_PROVIDER = 'TOKEN_PROVIDER';
export interface TokenProviderInterface {
  assign<T>(data: TokenProviderAssignParamsDto<T>): Promise<string>;
}
