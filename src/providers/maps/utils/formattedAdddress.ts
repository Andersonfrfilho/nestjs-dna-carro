import { Result } from '../dtos/geocode-inverse-search-by-coordinates.dto';

type ParamsDto = Result;

export function formattedAddress(data: ParamsDto[]): Partial<Result[]> {
  return data.map((item) => {
    return {
      address_components: item.address_components,
      formatted_address: item.formatted_address,
      geometry: item.geometry,
      place_id: item.place_id,
      plus_code: item.plus_code,
      types: item.types,
    };
  });
}
