import { MapsGeoCodeSearchAddressParamsDto } from './maps.geocodeSearchAddress.dto';

export const MAPS_PROVIDER = 'MAPS_PROVIDER';
export interface MapsProviderInterface {
  geocodeSearchByAddress(
    data: MapsGeoCodeSearchAddressParamsDto,
  ): Promise<string>;
}
