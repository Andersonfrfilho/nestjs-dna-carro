import { PhoneController } from './phone.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './phone.entity';
import { PHONE_REPOSITORY } from './interfaces/phone.repository.interface';
import { PhoneRepository } from './phone.repository';
import { CacheClientModule } from '@src/providers/cache/cache.module';
import { SmsModule } from '@src/providers/sms/sms.module';
import { PhoneSendCodeConfirmationCreateClient } from './services/phone.send-code-confirmation.service';
import { PHONE_SEND_CODE_CONFIRMATION } from '@src/providers/sms/sms.constant';
import { TokenModule } from '@src/providers/token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Phone]),
    CacheClientModule,
    SmsModule,
    TokenModule,
  ],
  providers: [
    {
      provide: PHONE_REPOSITORY,
      useClass: PhoneRepository,
    },
    {
      provide: PHONE_SEND_CODE_CONFIRMATION,
      useClass: PhoneSendCodeConfirmationCreateClient,
    },
  ],
  controllers: [PhoneController],
  exports: [PHONE_REPOSITORY],
})
export class PhoneModule {}
