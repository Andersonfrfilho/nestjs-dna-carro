import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { ADDRESS_REPOSITORY } from './interfaces/address.repository.interface';
import { AddressRepository } from './address.repository';
import { AddressController } from './address.controller';
import { MapsModule } from '@src/providers/maps/maps.module';
import { ADDRESS_FIND_GEOCODING_SERVICE } from './interfaces/address.find-geocoding.service.interface';
import { AddressFindGeocodingService } from './services/address.find-geocoding.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), MapsModule],
  providers: [
    {
      provide: ADDRESS_REPOSITORY,
      useClass: AddressRepository,
    },
    {
      provide: ADDRESS_FIND_GEOCODING_SERVICE,
      useClass: AddressFindGeocodingService,
    },
  ],
  controllers: [AddressController],
  exports: [ADDRESS_REPOSITORY, ADDRESS_FIND_GEOCODING_SERVICE],
})
export class AddressModule {}
