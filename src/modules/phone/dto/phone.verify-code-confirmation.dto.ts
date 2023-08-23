import { isValidPhoneNumber } from '@src/utils/is-valid-phone-number';
import { IsString, ValidateIf } from 'class-validator';

export class PhoneVerifyCodeConfirmationDto {
  @IsString()
  ddd: string;

  @ValidateIf((value) => isValidPhoneNumber(value))
  number: string;
}

export type PhoneVerifyCodeConfirmationServiceParamsDto =
  PhoneVerifyCodeConfirmationDto;

export type PhoneVerifyCodeConfirmationControllerParamsDto =
  PhoneVerifyCodeConfirmationDto;
