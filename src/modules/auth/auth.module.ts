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
  ],
  controllers: [AuthController],
  exports: [AUTH_CREATE_SESSION_SERVICE],
})
export class AuthModule {}
