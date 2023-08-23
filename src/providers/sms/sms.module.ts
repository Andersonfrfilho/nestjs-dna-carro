import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { HttpProviderModule } from '../http/http.module';
import { SMS_PROVIDER } from './sms.provider.interface';
import { SmsProvider } from './sms.provider';

@Module({
  imports: [HttpProviderModule, LoggerModule],
  providers: [
    {
      provide: SMS_PROVIDER,
      useClass: SmsProvider,
    },
  ],
  exports: [SMS_PROVIDER],
})
export class SmsModule {}
