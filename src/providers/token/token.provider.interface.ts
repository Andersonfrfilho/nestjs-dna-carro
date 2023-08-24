import {
  TokenProviderAssignParamsDto,
  TokenProviderVerifyParamsDto,
} from './token.dto';

export const TOKEN_PROVIDER = 'TOKEN_PROVIDER';

export interface TokenAssignParamsPayloadDto {
  id?: string;
  email: string;
}

export interface TokenProviderInterface {
  assign<T>(
    data: TokenProviderAssignParamsDto<T & TokenAssignParamsPayloadDto>,
  ): Promise<string>;
  verify<T>(data: TokenProviderVerifyParamsDto): Promise<T>;
}
