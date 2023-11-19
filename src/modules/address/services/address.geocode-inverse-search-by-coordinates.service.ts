import { Inject, Injectable } from '@nestjs/common';

import {
  MAPS_PROVIDER,
  MapsProviderInterface,
} from '@src/providers/maps/maps.provider.interface';
import {
  AddressGeocodeInverseSearchByCoordinatesServiceInterface,
  GeocodeInverseSearchByCoordinatesParamsDto,
} from '../interfaces/address.geocode-inverse-search-by-coordinates.interface';

@Injectable()
export class AddressGeocodeInverseSearchByCoordinatesService
  implements AddressGeocodeInverseSearchByCoordinatesServiceInterface
{
  constructor(
    @Inject(MAPS_PROVIDER)
    private mapsProvider: MapsProviderInterface,
  ) {}
  async execute(
    data: GeocodeInverseSearchByCoordinatesParamsDto,
  ): Promise<any> {
    return this.mapsProvider.geocodeInverseSearchByCoordinates(data);
  }
}
