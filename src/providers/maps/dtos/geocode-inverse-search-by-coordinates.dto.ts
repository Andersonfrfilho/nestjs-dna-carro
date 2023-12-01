interface ComponentAddress {
  street: string;
  neighborhood: string;
  postalCode: string;
  city: string;
  state: string;
  number: string;
}
export type GeocodeInverseSearchByCoordinatesResult = {
  components: ComponentAddress;
  formatted_address: string;
  place_id: string;
  latitude: string;
  longitude: string;
};

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code?: PlusCode2;
  types: string[];
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Geometry {
  location: Location;
  location_type: string;
  viewport: Viewport;
  bounds?: Bounds;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface Bounds {
  northeast: Northeast2;
  southwest: Southwest2;
}

export interface Northeast2 {
  lat: number;
  lng: number;
}

export interface Southwest2 {
  lat: number;
  lng: number;
}

export interface PlusCode2 {
  compound_code: string;
  global_code: string;
}

export interface GeocodeInverseSearchByCoordinatesParamsDto {
  latitude: string;
  longitude: string;
}
