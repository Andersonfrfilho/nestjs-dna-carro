import { IsEmail } from 'class-validator';

export type PhoneSendCodeConfirmationCreateClientTokenPayload = {
  code: string;
};

export class PhoneSendCodeConfirmationCreateClientDto {
  @IsEmail()
  email: string;
}

export type PhoneSendCodeConfirmationCreateClientParamsDto =
  PhoneSendCodeConfirmationCreateClientDto;

export type PhoneSendCodeConfirmationCreateClientControllerParamsDto =
  PhoneSendCodeConfirmationCreateClientDto;
