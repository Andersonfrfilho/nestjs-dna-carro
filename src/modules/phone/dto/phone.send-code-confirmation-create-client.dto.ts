import { PhoneDto } from './phone.dto';

export type PhoneSendCodeConfirmationCreateClientTokenPayload = {
  code: string;
};

export class PhoneSendCodeConfirmationCreateClientDto extends PhoneDto {}

export type PhoneSendCodeConfirmationCreateClientParamsDto =
  PhoneSendCodeConfirmationCreateClientDto;

export type PhoneSendCodeConfirmationCreateClientControllerParamsDto =
  PhoneSendCodeConfirmationCreateClientDto;

interface PhoneSendCodeConfirmationCreateClientResponseDto {
  expirationInMilliseconds: string;
}

export type PhoneSendCodeConfirmationCreateClientServiceResponseDto =
  PhoneSendCodeConfirmationCreateClientResponseDto;

export type PhoneSendCodeConfirmationCreateClientControllerResponseDto =
  PhoneSendCodeConfirmationCreateClientResponseDto;
