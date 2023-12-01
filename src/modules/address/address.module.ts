import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { ADDRESS_REPOSITORY } from './interfaces/address.repository.interface';
import { AddressRepository } from './address.repository';
import { AddressController } from './address.controller';
import { MapsModule } from '@src/providers/maps/maps.module';
import { ADDRESS_FIND_GEOCODING_SERVICE } from './interfaces/address.find-geocoding.service.interface';
import { AddressFindGeocodingService } from './services/address.find-geocoding.service';
import { LoggerModule } from '@src/providers/logger/logger.module';
import { ADDRESS_GEOCODE_INVERSE_SEARCH_BY_COORDINATES_SERVICE } from './interfaces/address.geocode-inverse-search-by-coordinates.interface';
import { AddressGeocodeInverseSearchByCoordinatesService } from './services/address.geocode-inverse-search-by-coordinates.service';
import { AddressesModule } from '@src/providers/addresses/addresses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    MapsModule,
    LoggerModule,
    AddressesModule,
  ],
  providers: [
    {
      provide: ADDRESS_REPOSITORY,
      useClass: AddressRepository,
    },
    {
      provide: ADDRESS_FIND_GEOCODING_SERVICE,
      useClass: AddressFindGeocodingService,
    },
    {
      provide: ADDRESS_GEOCODE_INVERSE_SEARCH_BY_COORDINATES_SERVICE,
      useClass: AddressGeocodeInverseSearchByCoordinatesService,
    },
  ],
  controllers: [AddressController],
  exports: [
    ADDRESS_REPOSITORY,
    ADDRESS_FIND_GEOCODING_SERVICE,
    ADDRESS_GEOCODE_INVERSE_SEARCH_BY_COORDINATES_SERVICE,
  ],
})
export class AddressModule {}
