import {
  TokenProviderAssignParamsDto,
  TokenProviderVerifyParamsDto,
} from './token.dto';

export const TOKEN_PROVIDER = 'TOKEN_PROVIDER';

export interface TokenAssignParamsPayloadDto {
  id?: string;
  email?: string;
  phone?: string;
}

export interface TokenDataDto {
  sub: string;
  iat: number;
  exp: number;
}

export interface TokenProviderInterface {
  assign<T>(
    data: TokenProviderAssignParamsDto<T & TokenAssignParamsPayloadDto>,
  ): Promise<string>;
  verify<T>(data: TokenProviderVerifyParamsDto): Promise<T & TokenDataDto>;
}
