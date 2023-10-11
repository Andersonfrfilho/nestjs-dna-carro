import { Inject, Injectable } from '@nestjs/common';

import { AddressFindGeocodingServiceInterface } from '../interfaces/address.find-geocoding.service.interface';
import {
  MAPS_PROVIDER,
  MapsProviderInterface,
} from '@src/providers/maps/maps.provider.interface';
import { MapsGeoCodeSearchAddressParamsDto } from '@src/providers/maps/maps.geocodeSearchAddress.dto';

@Injectable()
export class AddressFindGeocodingService
  implements AddressFindGeocodingServiceInterface
{
  constructor(
    @Inject(MAPS_PROVIDER)
    private mapsProvider: MapsProviderInterface,
  ) {}
  async execute(data: MapsGeoCodeSearchAddressParamsDto): Promise<any> {
    return this.mapsProvider.geocodeSearchByAddress(data);
  }
}
