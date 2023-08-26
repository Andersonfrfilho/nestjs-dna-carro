import { PhoneController } from './phone.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './phone.entity';
import { PHONE_REPOSITORY } from './interfaces/phone.repository.interface';
import { PhoneRepository } from './phone.repository';
import { CacheClientModule } from '@src/providers/cache/cache.module';
import { SmsModule } from '@src/providers/sms/sms.module';
import { PhoneSendCodeConfirmationCreateClientService } from './services/phone.send-code-confirmation-create-client.service';
import { TokenModule } from '@src/providers/token/token.module';
import { PHONE_SEND_CODE_CONFIRMATION_CREATE_CLIENT_SERVICE } from './interfaces/phone.send-code-confirmation-create-client.interface';
import { PHONE_VERIFY_CODE_CONFIRMATION_CREATE_CLIENT_SERVICE } from './interfaces/phone.verify-code-confirmation-create-client.interface';
import { PhoneVerifyCodeConfirmationCreateClientService } from './services/phone.verify-code-confirmation-create-client.service';
import { LoggerModule } from '@src/providers/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Phone]),
    CacheClientModule,
    SmsModule,
    TokenModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: PHONE_REPOSITORY,
      useClass: PhoneRepository,
    },
    {
      provide: PHONE_SEND_CODE_CONFIRMATION_CREATE_CLIENT_SERVICE,
      useClass: PhoneSendCodeConfirmationCreateClientService,
    },
    {
      provide: PHONE_VERIFY_CODE_CONFIRMATION_CREATE_CLIENT_SERVICE,
      useClass: PhoneVerifyCodeConfirmationCreateClientService,
    },
  ],
  controllers: [PhoneController],
  exports: [PHONE_REPOSITORY],
})
export class PhoneModule {}
