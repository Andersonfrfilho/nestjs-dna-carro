import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  ADDRESS_FIND_GEOCODING_SERVICE,
  AddressFindGeocodingServiceInterface,
} from './interfaces/address.find-geocoding.service.interface';
import { AddressFindGeocodingControllerParamsDTO } from './dto/address.find-geocoding.dto';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

@Controller('address')
export class AddressController {
  constructor(
    @Inject(ADDRESS_FIND_GEOCODING_SERVICE)
    private addressFindGeocodingService: AddressFindGeocodingServiceInterface,
  ) {}
  @Post('/find/geocoding')
  async cacheCreate(
    @Body() addressFindGeocoding: AddressFindGeocodingControllerParamsDTO,
  ): Promise<void> {
    return this.addressFindGeocodingService.execute(addressFindGeocoding);
  }
}
