export const MAPS_PROVIDER = 'MAPS_PROVIDER';
export interface MapsProviderInterface {
  geocodeSearchAddressByName(address: string): Promise<string>;
}
