import { MapsGeoCodeSearchAddressParamsDTO } from '@src/providers/maps/maps.geocodeSearchAddress.dto';

export const ADDRESS_FIND_GEOCODING_SERVICE = 'ADDRESS_FIND_GEOCODING_SERVICE';

export interface AddressFindGeocodingServiceInterface {
  execute(addressParams: MapsGeoCodeSearchAddressParamsDTO): Promise<any>;
}
