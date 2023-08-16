import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  ADDRESS_FIND_GEOCODING_SERVICE,
  AddressFindGeocodingServiceInterface,
} from './interfaces/address.find-geocoding.service.interface';
import { AddressFindGeocodingControllerParamsDTO } from './dto/address.find-geocoding.dto';

@Controller('address')
export class AddressController {
  constructor(
    @Inject(ADDRESS_FIND_GEOCODING_SERVICE)
    private addressFindGeocodingService: AddressFindGeocodingServiceInterface,
  ) {}
  @Get('/find/geocoding')
  async cacheCreate(
    @Body() addressFindGeocoding: AddressFindGeocodingControllerParamsDTO,
  ): Promise<void> {
    await this.addressFindGeocodingService.execute(
      addressFindGeocoding.address,
    );
  }
}
