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
import { CacheClientModule } from '@src/providers/cache/cache.module';
import { SmsModule } from '@src/providers/sms/sms.module';
import { AUTH_FORGOT_PASSWORD_PHONE_SEND_CODE_SERVICE } from './interfaces/auth.forgot-password-phone-send-code.interface';
import { AuthForgotPasswordPhoneSendCodeService } from './services/auth.forgot-password-phone-send-code.service';
import { AUTH_FORGOT_PASSWORD_PHONE_VERIFY_CODE_SERVICE } from './interfaces/auth.forgot-password-phone-verify-code.interface';
import { AuthForgotPasswordPhoneVerifyCodeService } from './services/auth.forgot-password-phone-verify-code.service';
import { AUTH_FORGOT_PASSWORD_PHONE_RESET_SERVICE } from './interfaces/auth.forgot-password-phone-reset.interface';
import { AuthForgotPasswordPhoneResetService } from './services/auth.forgot-password-phone-reset.service';

@Module({
  imports: [
    LoggerModule,
    UserModule,
    HashModule,
    TokenModule,
    CacheClientModule,
    SmsModule,
  ],
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
      provide: AUTH_FORGOT_PASSWORD_PHONE_SEND_CODE_SERVICE,
      useClass: AuthForgotPasswordPhoneSendCodeService,
    },
    {
      provide: AUTH_FORGOT_PASSWORD_PHONE_VERIFY_CODE_SERVICE,
      useClass: AuthForgotPasswordPhoneVerifyCodeService,
    },
    {
      provide: AUTH_FORGOT_PASSWORD_PHONE_RESET_SERVICE,
      useClass: AuthForgotPasswordPhoneResetService,
    },
  ],
  controllers: [AuthController],
  exports: [AUTH_CREATE_SESSION_SERVICE],
})
export class AuthModule {}
