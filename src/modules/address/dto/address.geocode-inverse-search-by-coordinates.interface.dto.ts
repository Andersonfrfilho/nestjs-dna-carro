import { IsOptional, IsString } from 'class-validator';

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

export class AddressComponent {
  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsString()
  neighborhood: string;

  @IsString()
  street: string;
}

export class AddressGeocodeInverseSearchByCoordinatesResultDto {
  components: AddressComponent[];

  @IsString()
  formatted_address: string;

  @IsString()
  place_id: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;

  @IsString()
  @IsOptional()
  country?: string;
}

export class AddressGeocodeInverseSearchByCoordinatesParamsDto {
  @IsString()
  latitude: string;

  @IsString()
  longitude: string;
}
