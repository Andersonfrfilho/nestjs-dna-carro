import { isValidPhoneNumber } from '@src/utils/is-valid-phone-number';
import { IsString, ValidateIf } from 'class-validator';

export class AuthForgotPasswordPhoneDto {
  @IsString()
  countryCode: string;

  @IsString()
  ddd: string;

  @ValidateIf((value) => isValidPhoneNumber(value))
  number: string;
}

export class AuthForgotPasswordPhoneServiceParamsDto extends AuthForgotPasswordPhoneDto {}

export class AuthForgotPasswordPhoneControllerParamsDto extends AuthForgotPasswordPhoneDto {}

export class AuthForgotPasswordPhoneResponseDto {
  token: string;
  refreshToken: string;
  expireIn: number;
  expireInRefreshToken: number;
}

export class AuthForgotPasswordPhoneServiceResponse extends AuthForgotPasswordPhoneResponseDto {}

export class AuthForgotPasswordPhoneControllerResponse extends AuthForgotPasswordPhoneResponseDto {}

export interface AuthTokenPayloadDto {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export type PhoneSendCodeAuthForgotPasswordPhoneTokenPayload = {
  code: string;
};
