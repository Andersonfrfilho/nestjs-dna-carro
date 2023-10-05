import { Match } from '@src/commons/match.decorator';
import { isValidPhoneNumber } from '@src/utils/is-valid-phone-number';
import { IsString, ValidateIf } from 'class-validator';

export class AuthForgotPasswordPhoneResetDto {
  @IsString()
  password: string;

  @IsString()
  @Match('password')
  confirmPassword: string;

  @IsString()
  countryCode: string;

  @IsString()
  ddd: string;

  @ValidateIf((value) => isValidPhoneNumber(value))
  number: string;
}

export class AuthForgotPasswordPhoneResetServiceParamsDto extends AuthForgotPasswordPhoneResetDto {}

export class AuthForgotPasswordPhoneResetControllerParamsDto extends AuthForgotPasswordPhoneResetDto {}
