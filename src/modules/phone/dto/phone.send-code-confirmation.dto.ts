import { isValidPhoneNumber } from '@src/utils/is-valid-phone-number';
import { IsString, ValidateIf } from 'class-validator';

export class PhoneSendCodeConfirmationDto {
  @IsString()
  ddd: string;

  @ValidateIf((value) => isValidPhoneNumber(value))
  number: string;
}

export type PhoneSendCodeConfirmationServiceParamsDto =
  PhoneSendCodeConfirmationDto;

export type PhoneSendCodeConfirmationControllerParamsDto =
  PhoneSendCodeConfirmationDto;
