import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import config from '@src/config';
import { TOKEN_PROVIDER } from './token.provider.interface';
import { TokenProvider } from './token.provider';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.token.secret,
      signOptions: { expiresIn: '60s' },
    }),
    LoggerModule,
  ],
  providers: [
    {
      provide: TOKEN_PROVIDER,
      useClass: TokenProvider,
    },
  ],
  exports: [TOKEN_PROVIDER],
})
export class TokenModule {}
