import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  AuthCreateSessionControllerParamsDto,
  AuthCreateSessionResponseDto,
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

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_CREATE_SESSION_SERVICE)
    private authCreateSessionService: AuthCreateSessionServiceInterface,
    @Inject(AUTH_RENEW_REFRESH_TOKEN_SERVICE)
    private authRenewRefreshTokenService: AuthRenewRefreshTokenServiceInterface,
  ) {}
  @Post('/session')
  async sessionCreate(
    @Body() authCreateSessionParams: AuthCreateSessionControllerParamsDto,
  ): Promise<AuthCreateSessionResponseDto> {
    return this.authCreateSessionService.execute(authCreateSessionParams);
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
}
