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
import { AddressFindGeocodingControllerParamsDTO } from './dto/address.find-geocoding.dto';

@Controller('address')
export class AddressController {
  constructor(
    @Inject(ADDRESS_FIND_GEOCODING_SERVICE)
    private addressFindGeocodingService: AddressFindGeocodingServiceInterface,
  ) {}
  @Post('/find/geocoding')
  @HttpCode(HttpStatus.OK)
  async cacheCreate(
    @Body() addressFindGeocoding: AddressFindGeocodingControllerParamsDTO,
  ): Promise<void> {
    return this.addressFindGeocodingService.execute(addressFindGeocoding);
  }
}
