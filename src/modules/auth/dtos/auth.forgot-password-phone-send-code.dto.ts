import { isValidPhoneNumber } from '@src/utils/is-valid-phone-number';
import { IsString, ValidateIf } from 'class-validator';

export class AuthForgotPasswordPhoneSendCodeDto {
  @IsString()
  countryCode: string;

  @IsString()
  ddd: string;

  @ValidateIf((value) => isValidPhoneNumber(value))
  number: string;
}

export class AuthForgotPasswordPhoneSendCodeServiceParamsDto extends AuthForgotPasswordPhoneSendCodeDto {}

export class AuthForgotPasswordPhoneSendCodeControllerParamsDto extends AuthForgotPasswordPhoneSendCodeDto {}

export class AuthForgotPasswordPhoneSendCodeResponseDto {
  token: string;
  refreshToken: string;
  expireIn: number;
  expireInRefreshToken: number;
}

export class AuthForgotPasswordPhoneSendCodeServiceResponse extends AuthForgotPasswordPhoneSendCodeResponseDto {}

export class AuthForgotPasswordPhoneSendCodeControllerResponse extends AuthForgotPasswordPhoneSendCodeResponseDto {}

export interface AuthTokenPayloadDto {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export type PhoneSendCodeAuthForgotPasswordPhoneSendCodeTokenPayload = {
  code: string;
};

export interface AuthForgotPasswordPhoneSendVerifyTokenCache {
  token: string;
  attempt: number;
}

export interface AuthForgotPasswordPhoneSendVerifyTokenPassCache
  extends AuthForgotPasswordPhoneSendVerifyTokenCache {
  resetPassword: true;
}

export type AuthForgotPasswordPhoneVerifyTokenPayloadDto = {
  email: string;
  code: string;
  iat: number;
  exp: number;
};

export interface AuthForgotPasswordPhoneSendCodeResultDto {
  expireInMinutes: string;
}

export type AuthForgotPasswordPhoneSendCodeServiceResultDto =
  AuthForgotPasswordPhoneSendCodeResultDto;
export type AuthForgotPasswordPhoneSendCodeControllerResultDto =
  AuthForgotPasswordPhoneSendCodeResultDto;
