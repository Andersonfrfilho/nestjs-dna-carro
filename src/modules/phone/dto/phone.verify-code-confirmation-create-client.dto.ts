import { IsEmail, IsString, Length } from 'class-validator';
import { PhoneDto } from './phone.dto';

export class PhoneVerifyCodeConfirmationCreateClientDto extends PhoneDto {
  @IsString()
  @Length(4)
  code: string;

  @IsEmail()
  email: string;
}

export type PhoneVerifyCodeConfirmationCreateClientServiceParamsDto =
  PhoneVerifyCodeConfirmationCreateClientDto;

export type PhoneVerifyCodeConfirmationCreateClientControllerParamsDto =
  PhoneVerifyCodeConfirmationCreateClientDto;

export type PhoneVerifyCodeConfirmationGetTokenCacheDto = {
  token: string;
};

export type PhoneVerifyCodeConfirmationGetTokenPayloadCacheDto = {
  email: string;
  code: string;
  iat: number;
  exp: number;
};
