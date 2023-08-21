import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './phone.entity';
import { PHONE_REPOSITORY } from './interfaces/phone.repository.interface';
import { PhoneRepository } from './phone.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  providers: [
    {
      provide: PHONE_REPOSITORY,
      useClass: PhoneRepository,
    },
  ],
  exports: [PHONE_REPOSITORY],
})
export class PhoneModule {}
