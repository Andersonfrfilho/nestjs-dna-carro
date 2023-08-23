import { isValidPhoneNumber } from '@src/utils/is-valid-phone-number';
import { IsEmail, IsString, ValidateIf } from 'class-validator';

export type PhoneSendCodeConfirmationTokenPayload = { code: string };

export class PhoneSendCodeConfirmationDto {
  @IsString()
  ddd: string;

  @ValidateIf((value) => isValidPhoneNumber(value))
  number: string;

  @IsEmail()
  email: string;
}

export type PhoneSendCodeConfirmationServiceParamsDto =
  PhoneSendCodeConfirmationDto;

export type PhoneSendCodeConfirmationControllerParamsDto =
  PhoneSendCodeConfirmationDto;
