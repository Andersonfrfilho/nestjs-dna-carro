import { Body, Controller, Get, Inject } from '@nestjs/common';
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
    @Inject(LOGGER_PROVIDER)
    private logger: LoggerProviderInterface,
    @Inject(ADDRESS_FIND_GEOCODING_SERVICE)
    private addressFindGeocodingService: AddressFindGeocodingServiceInterface,
  ) {}
  @Get('/find/geocoding')
  async cacheCreate(
    @Body() addressFindGeocoding: AddressFindGeocodingControllerParamsDTO,
  ): Promise<void> {
    this.logger.info('initializa cache create');
    await this.addressFindGeocodingService.execute(
      addressFindGeocoding.address,
    );
  }
}
