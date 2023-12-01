import { IsString } from 'class-validator';

export class AuthRenewRefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class AuthRenewRefreshTokenServiceParamsDto extends AuthRenewRefreshTokenDto {}

export class AuthRenewRefreshTokenControllerParamsDto extends AuthRenewRefreshTokenDto {}

export class AuthRenewRefreshTokenResponseDto {
  token: string;
  refreshToken: string;
  expireIn: number;
  expireInRefreshToken: number;
}

export class AuthRenewRefreshTokenServiceResponse extends AuthRenewRefreshTokenResponseDto {}

export class AuthRenewRefreshTokenControllerResponse extends AuthRenewRefreshTokenResponseDto {}

export interface AuthTokenPayloadDto {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}
