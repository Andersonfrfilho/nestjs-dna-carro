import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import {
  AuthCreateSessionBodyControllerParamsDto,
  AuthCreateSessionResponseDto,
  AuthPathParamDto,
} from './dtos/auth.create-session.dto';
import {
  AUTH_CREATE_SESSION_SERVICE,
  AuthCreateSessionServiceInterface,
} from './interfaces/auth.create-session.interface';
import {
  AuthRenewRefreshTokenControllerParamsDto,
  AuthRenewRefreshTokenResponseDto,
} from './dtos/auth.renew-refresh-token.dto';
import {
  AUTH_RENEW_REFRESH_TOKEN_SERVICE,
  AuthRenewRefreshTokenServiceInterface,
} from './interfaces/auth.renew-refresh-token.interface';
import {
  AuthForgotPasswordPhoneSendCodeControllerParamsDto,
  AuthForgotPasswordPhoneSendCodeControllerResponse,
  AuthForgotPasswordPhoneSendCodeControllerResultDto,
} from './dtos/auth.forgot-password-phone-send-code.dto';
import {
  AUTH_FORGOT_PASSWORD_PHONE_SEND_CODE_SERVICE,
  AuthForgotPasswordPhoneSendCodeServiceInterface,
} from './interfaces/auth.forgot-password-phone-send-code.interface';
import {
  AuthForgotPasswordPhoneResetServiceInterface,
  AUTH_FORGOT_PASSWORD_PHONE_RESET_SERVICE,
} from './interfaces/auth.forgot-password-phone-reset.interface';
import {
  AUTH_FORGOT_PASSWORD_PHONE_VERIFY_CODE_SERVICE,
  AuthForgotPasswordPhoneVerifyCodeServiceInterface,
} from './interfaces/auth.forgot-password-phone-verify-code.interface';
import { AuthForgotPasswordPhoneVerifyCodeControllerParamsDto } from './dtos/auth.forgot-password-phone-verify-code.dto';
import { AuthForgotPasswordPhoneResetControllerParamsDto } from './dtos/auth.forgot-password-phone-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_CREATE_SESSION_SERVICE)
    private authCreateSessionService: AuthCreateSessionServiceInterface,
    @Inject(AUTH_RENEW_REFRESH_TOKEN_SERVICE)
    private authRenewRefreshTokenService: AuthRenewRefreshTokenServiceInterface,
    @Inject(AUTH_FORGOT_PASSWORD_PHONE_SEND_CODE_SERVICE)
    private authForgotPasswordPhoneSendCodeService: AuthForgotPasswordPhoneSendCodeServiceInterface,
    @Inject(AUTH_FORGOT_PASSWORD_PHONE_RESET_SERVICE)
    private authForgotPasswordPhoneResetService: AuthForgotPasswordPhoneResetServiceInterface,
    @Inject(AUTH_FORGOT_PASSWORD_PHONE_VERIFY_CODE_SERVICE)
    private authForgotPasswordPhoneVerifyCodeService: AuthForgotPasswordPhoneVerifyCodeServiceInterface,
  ) {}
  @Post('/session/:type')
  async sessionCreate(
    @Param() paramPathCreateSessionParams: AuthPathParamDto,
    @Body()
    authCreateSessionBodyParams: AuthCreateSessionBodyControllerParamsDto,
  ): Promise<AuthCreateSessionResponseDto> {
    console.log(paramPathCreateSessionParams);
    return this.authCreateSessionService.execute({
      ...authCreateSessionBodyParams,
      type: paramPathCreateSessionParams.type,
    });
  }

  @Post('/session/refresh-token')
  async sessionRefreshTokenCreate(
    @Body()
    authRenewRefreshTokenParams: AuthRenewRefreshTokenControllerParamsDto,
  ): Promise<AuthRenewRefreshTokenResponseDto> {
    return this.authRenewRefreshTokenService.execute(
      authRenewRefreshTokenParams,
    );
  }

  @Post('/forgot-password/phone/send/code')
  async authForgotPasswordPhoneSendCode(
    @Body()
    authForgotPasswordPhoneSendCodeServiceParams: AuthForgotPasswordPhoneSendCodeControllerParamsDto,
  ): Promise<AuthForgotPasswordPhoneSendCodeControllerResultDto> {
    return this.authForgotPasswordPhoneSendCodeService.execute(
      authForgotPasswordPhoneSendCodeServiceParams,
    );
  }

  @Post('/forgot-password/phone/verify/code')
  async authForgotPasswordPhoneVerifyCode(
    @Body()
    authForgotPasswordPhoneVerifyCodeParams: AuthForgotPasswordPhoneVerifyCodeControllerParamsDto,
  ): Promise<void> {
    await this.authForgotPasswordPhoneVerifyCodeService.execute(
      authForgotPasswordPhoneVerifyCodeParams,
    );
  }

  @Post('/forgot-password/phone/reset/code')
  async authForgotPasswordPhoneResetCode(
    @Body()
    authForgotPasswordPhoneResetControllerParams: AuthForgotPasswordPhoneResetControllerParamsDto,
  ): Promise<void> {
    await this.authForgotPasswordPhoneResetService.execute(
      authForgotPasswordPhoneResetControllerParams,
    );
  }
}
