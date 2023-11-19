import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  ADDRESS_FIND_GEOCODING_SERVICE,
  AddressFindGeocodingServiceInterface,
} from './interfaces/address.find-geocoding.service.interface';
import { AddressFindGeocodingControllerParamsDto } from './dto/address.find-geocoding.dto';
import {
  ADDRESS_GEOCODE_INVERSE_SEARCH_BY_COORDINATES_SERVICE,
  AddressGeocodeInverseSearchByCoordinatesServiceInterface,
} from './interfaces/address.geocode-inverse-search-by-coordinates.interface';
import {
  AddressGeocodeInverseSearchByCoordinatesParamsDto,
  AddressGeocodeInverseSearchByCoordinatesResultDto,
} from './dto/address.geocode-inverse-search-by-coordinates.interface.dto';

@Controller('address')
export class AddressController {
  constructor(
    @Inject(ADDRESS_FIND_GEOCODING_SERVICE)
    private addressFindGeocodingService: AddressFindGeocodingServiceInterface,
    @Inject(ADDRESS_GEOCODE_INVERSE_SEARCH_BY_COORDINATES_SERVICE)
    private addressGeocodeInverseSearchByCoordinatesService: AddressGeocodeInverseSearchByCoordinatesServiceInterface,
  ) {}
  @Post('/find/geocoding')
  @HttpCode(HttpStatus.OK)
  async getAddressGeocoding(
    @Body() addressFindGeocoding: AddressFindGeocodingControllerParamsDto,
  ): Promise<void> {
    return this.addressFindGeocodingService.execute(addressFindGeocoding);
  }

  @Post('/find/geocoding/reverse')
  @HttpCode(HttpStatus.OK)
  async addressGeocodeInverseSearchByCoordinates(
    @Body()
    addressFindGeocoding: AddressGeocodeInverseSearchByCoordinatesParamsDto,
  ): Promise<AddressGeocodeInverseSearchByCoordinatesResultDto> {
    return this.addressGeocodeInverseSearchByCoordinatesService.execute(
      addressFindGeocoding,
    );
  }
}
