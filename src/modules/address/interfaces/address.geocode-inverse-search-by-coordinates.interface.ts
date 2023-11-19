export interface GeocodeInverseSearchByCoordinatesParamsDto {
  latitude: string;
  longitude: string;
}
interface ComponentAddress {
  street: string;
  neighborhood: string;
  postalCode: string;
  city: string;
  state: string;
}
export type GeocodeInverseSearchByCoordinatesResult = {
  components: ComponentAddress[];
  formatted_address: string;
  place_id: string;
  latitude: string;
  longitude: string;
};

export const ADDRESS_GEOCODE_INVERSE_SEARCH_BY_COORDINATES_SERVICE =
  'ADDRESS_GEOCODE_INVERSE_SEARCH_BY_COORDINATES_SERVICE';

export interface AddressGeocodeInverseSearchByCoordinatesServiceInterface {
  execute(
    addressParams: GeocodeInverseSearchByCoordinatesParamsDto,
  ): Promise<GeocodeInverseSearchByCoordinatesResult>;
}
