import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './phone.entity';
import { PHONE_REPOSITORY } from './interfaces/phone.repository.interface';
import { PhoneRepository } from './phone.repository';
import { CacheClientModule } from '@src/providers/cache/cache.module';
import { SmsModule } from '@src/providers/sms/sms.module';

@Module({
  imports: [TypeOrmModule.forFeature([Phone]), CacheClientModule, SmsModule],
  providers: [
    {
      provide: PHONE_REPOSITORY,
      useClass: PhoneRepository,
    },
  ],
  exports: [PHONE_REPOSITORY],
})
export class PhoneModule {}
