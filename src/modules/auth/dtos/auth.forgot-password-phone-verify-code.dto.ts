import { isValidPhoneNumber } from '@src/utils/is-valid-phone-number';
import { IsString, ValidateIf } from 'class-validator';

export class AuthForgotPasswordPhoneVerifyCodeDto {
  @IsString()
  countryCode: string;

  @IsString()
  ddd: string;

  @ValidateIf((value) => isValidPhoneNumber(value))
  number: string;

  @IsString()
  code: string;
}

export class AuthForgotPasswordPhoneVerifyCodeServiceParamsDto extends AuthForgotPasswordPhoneVerifyCodeDto {}

export class AuthForgotPasswordPhoneVerifyCodeControllerParamsDto extends AuthForgotPasswordPhoneVerifyCodeDto {}
