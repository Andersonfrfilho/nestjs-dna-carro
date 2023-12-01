import { Inject, Injectable } from '@nestjs/common';

import {
  MAPS_PROVIDER,
  MapsProviderInterface,
} from '@src/providers/maps/maps.provider.interface';
import {
  AddressGeocodeInverseSearchByCoordinatesServiceInterface,
  GeocodeInverseSearchByCoordinatesParamsDto,
} from '../interfaces/address.geocode-inverse-search-by-coordinates.interface';
import {
  ADDRESSES_PROVIDER,
  AddressesProviderInterface,
} from '@src/providers/addresses/addresses.provider.interface';
import {
  COMPONENT_ADDRESS_TYPES,
  COMPONENT_TYPE_CITY,
  COMPONENT_TYPE_NEIGHBORHOOD,
  COMPONENT_TYPE_POSTAL_CODE,
  COMPONENT_TYPE_STATE,
  COMPONENT_TYPE_STREET,
} from '../address.constante';

@Injectable()
export class AddressGeocodeInverseSearchByCoordinatesService
  implements AddressGeocodeInverseSearchByCoordinatesServiceInterface
{
  constructor(
    @Inject(MAPS_PROVIDER)
    private mapsProvider: MapsProviderInterface,
    @Inject(ADDRESSES_PROVIDER)
    private addressesProvider: AddressesProviderInterface,
  ) {}
  async execute(
    data: GeocodeInverseSearchByCoordinatesParamsDto,
  ): Promise<any> {
    const result = await this.mapsProvider.geocodeInverseSearchByCoordinates(
      data,
    );
    const keys = Object.keys(result.components);

    if (keys.length === COMPONENT_ADDRESS_TYPES.length) {
      return result;
    }

    const keysWithoutResult = COMPONENT_ADDRESS_TYPES.filter(
      (component) => !keys.includes(component),
    );

    if (!keysWithoutResult.includes(COMPONENT_TYPE_POSTAL_CODE)) {
      return result;
    }

    const resultAddressByPostalCode =
      await this.addressesProvider.findAddressByCep(
        result.components.postalCode,
      );

    if (keysWithoutResult.includes(COMPONENT_TYPE_STREET)) {
      result.components.street = resultAddressByPostalCode.logradouro;
    }

    if (keysWithoutResult.includes(COMPONENT_TYPE_NEIGHBORHOOD)) {
      result.components.neighborhood = resultAddressByPostalCode.bairro;
    }

    if (keysWithoutResult.includes(COMPONENT_TYPE_CITY)) {
      result.components.city = resultAddressByPostalCode.localidade;
    }

    if (keysWithoutResult.includes(COMPONENT_TYPE_STATE)) {
      result.components.state = resultAddressByPostalCode.uf;
    }

    return result;
  }
}
