import { MapsGeoCodeSearchAddressParamsDTO } from './maps.geocodeSearchAddress.dto';

export const MAPS_PROVIDER = 'MAPS_PROVIDER';
export interface MapsProviderInterface {
  geocodeSearchByAddress(
    data: MapsGeoCodeSearchAddressParamsDTO,
  ): Promise<string>;
}
