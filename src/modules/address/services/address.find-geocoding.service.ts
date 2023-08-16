import { Inject, Injectable } from '@nestjs/common';

import { AddressFindGeocodingServiceInterface } from '../interfaces/address.find-geocoding.service.interface';
import {
  MAPS_PROVIDER,
  MapsProviderInterface,
} from '@src/providers/maps/maps.provider.interface';

@Injectable()
export class AddressFindGeocodingService
  implements AddressFindGeocodingServiceInterface
{
  constructor(
    @Inject(MAPS_PROVIDER)
    private mapsProvider: MapsProviderInterface,
  ) {}
  async execute(addressParams: string): Promise<any> {
    const addresses = await this.mapsProvider.geocodeSearchAddressByName(
      addressParams,
    );
    console.log(addresses);
  }
}
