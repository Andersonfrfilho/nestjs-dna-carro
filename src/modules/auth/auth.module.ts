import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { LoggerModule } from '@src/providers/logger/logger.module';
import { HashModule } from '@src/providers/hash/hash.module';
import { TokenModule } from '@src/providers/token/token.module';
import { AUTH_CREATE_SESSION_SERVICE } from './interfaces/auth.create-session.interface';
import { AuthController } from './auth.controller';
import { AUTH_RENEW_REFRESH_TOKEN_SERVICE } from './interfaces/auth.renew-refresh-token.interface';
import { AuthRenewRefreshTokenService } from './services/auth.renew-refresh-token.service';
import { AuthCreateSessionService } from './services/auth.create-session.service';
import { AUTH_FORGOT_PASSWORD_PHONE_SERVICE } from './interfaces/auth.forgot-password-phone.interface';
import { AuthForgotPasswordPhoneService } from './services/auth.forgot-password-phone.service';

@Module({
  imports: [LoggerModule, UserModule, HashModule, TokenModule],
  providers: [
    {
      provide: AUTH_CREATE_SESSION_SERVICE,
      useClass: AuthCreateSessionService,
    },
    {
      provide: AUTH_RENEW_REFRESH_TOKEN_SERVICE,
      useClass: AuthRenewRefreshTokenService,
    },
    {
      provide: AUTH_FORGOT_PASSWORD_PHONE_SERVICE,
      useClass: AuthForgotPasswordPhoneService,
    },
  ],
  controllers: [AuthController],
  exports: [AUTH_CREATE_SESSION_SERVICE],
})
export class AuthModule {}
