import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { ADDRESS_REPOSITORY } from './interfaces/address.repository.interface';
import { AddressRepository } from './address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [
    {
      provide: ADDRESS_REPOSITORY,
      useClass: AddressRepository,
    },
  ],
  exports: [ADDRESS_REPOSITORY],
})
export class AddressModule {}
