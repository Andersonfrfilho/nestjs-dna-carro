export const ADDRESS_FIND_GEOCODING_SERVICE = 'ADDRESS_FIND_GEOCODING_SERVICE';

export interface AddressFindGeocodingServiceInterface {
  execute(addressParams: string): Promise<any>;
}
