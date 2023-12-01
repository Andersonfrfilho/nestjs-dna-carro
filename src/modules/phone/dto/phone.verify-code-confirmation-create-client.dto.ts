import { IsString, Length } from 'class-validator';
import { PhoneDto } from './phone.dto';

export class PhoneVerifyCodeConfirmationCreateClientDto extends PhoneDto {
  @IsString()
  @Length(4)
  code: string;

  @IsString()
  phone: string;
}

export type PhoneVerifyCodeConfirmationCreateClientServiceParamsDto =
  PhoneVerifyCodeConfirmationCreateClientDto;

export type PhoneVerifyCodeConfirmationCreateClientControllerParamsDto =
  PhoneVerifyCodeConfirmationCreateClientDto;

export type PhoneVerifyCodeConfirmationGetTokenCacheDto = {
  token: string;
};

export type PhoneVerifyCodeConfirmationGetTokenPayloadCacheDto = {
  phone: string;
  code: string;
  iat: number;
  exp: number;
};
