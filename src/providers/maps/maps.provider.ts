import { MapsProviderInterface } from './maps.provider.interface';
import config from '@src/config';
import { firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { CustomException } from '@src/error/custom.exception';
import { GOOGLE_API_GEOCODING_ERROR } from '@src/error/error.constant';
import {
  GOOGLE_GEOCODING_STATUS,
  GOOGLE_LANGUAGE_ACCEPT,
  GOOGLE_LOCATION_TYPE,
  GOOGLE_RESULT_TYPES,
} from './maps.constant';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '../logger/logger.provider.interface';
import { MapsGeoCodeSearchAddressParamsDto } from './maps.geocodeSearchAddress.dto';
import {
  HTTP_INTERCEPTOR_PROVIDER,
  HttpInterceptorProviderInterface,
} from '../http/http.interceptor.interface';
import { GoogleGeocodeResponse } from './maps.dto';
import {
  GeocodeInverseSearchByCoordinatesParamsDto,
  GeocodeInverseSearchByCoordinatesResult,
} from './dtos/geocode-inverse-search-by-coordinates.dto';

@Injectable()
export class MapsProvider implements MapsProviderInterface {
  private apiKey: string;
  private baseURL: string;
  constructor(
    @Inject(HTTP_INTERCEPTOR_PROVIDER)
    private readonly httpInterceptorProvider: HttpInterceptorProviderInterface,
    @Inject(LOGGER_PROVIDER)
    private readonly loggerProvider: LoggerProviderInterface,
  ) {
    this.apiKey = config.maps.apiKey;
    this.baseURL = 'https://maps.googleapis.com/maps/api';
  }

  async geocodeInverseSearchByCoordinates(
    data: GeocodeInverseSearchByCoordinatesParamsDto,
  ): Promise<GeocodeInverseSearchByCoordinatesResult> {
    const apiKey = `key=${this.apiKey}`;
    const language = `language=${GOOGLE_LANGUAGE_ACCEPT.BRAZIL}`;
    const locationType = `location_type=${GOOGLE_LOCATION_TYPE.ROOFTOP}`;
    const resultType = `result_type=${GOOGLE_RESULT_TYPES.STREET_ADDRESS}`;
    const latLng = `latlng=${data.latitude},${data.longitude}`;
    const pathParams = `${apiKey}&${latLng}&${language}&${locationType}&${resultType}`;
    const urlEncoded = new URL(
      `${this.baseURL}/geocode/json?${pathParams}`,
    ).toString();
    try {
      const { data } = await firstValueFrom(
        this.httpInterceptorProvider.get<GoogleGeocodeResponse>(urlEncoded),
      );

      if (data.status === GOOGLE_GEOCODING_STATUS.ZERO_RESULTS) {
        this.loggerProvider.warn(
          'MapsProvider - geocodeInverseSearchByCoordinates - Address not found',
          {
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
          },
        );
        return {} as GeocodeInverseSearchByCoordinatesResult;
      }
      const addresses = data.results.map((address) => {
        const addressComponents = address.address_components
          .map((addressComponent) => {
            const street = addressComponent.types.some(
              (type) =>
                type === GOOGLE_RESULT_TYPES.STREET_ADDRESS || type === 'route',
            )
              ? addressComponent.long_name
              : '';

            const number = addressComponent.types.includes('street_number')
              ? addressComponent.long_name
              : '';

            const neighborhood = addressComponent.types.some(
              (type) =>
                type === GOOGLE_RESULT_TYPES.NEIGHBORHOOD ||
                type === 'sublocality' ||
                type === 'sublocality_level_1',
            )
              ? addressComponent.long_name
              : '';

            const postalCode = addressComponent.types.includes(
              GOOGLE_RESULT_TYPES.POSTAL_CODE,
            )
              ? addressComponent.long_name
              : '';

            const city = addressComponent.types.some(
              (type) =>
                type === 'locality' || type === 'administrative_area_level_2',
            )
              ? addressComponent.long_name
              : '';

            const state = addressComponent.types.includes(
              'administrative_area_level_1',
            )
              ? addressComponent.long_name
              : '';
            const country = addressComponent.types.includes('country')
              ? addressComponent.long_name
              : '';

            const componentObject = {};
            Object.assign(componentObject, street && { street });
            Object.assign(componentObject, number && { number });
            Object.assign(componentObject, neighborhood && { neighborhood });
            Object.assign(componentObject, postalCode && { postalCode });
            Object.assign(componentObject, city && { city });
            Object.assign(componentObject, state && { state });
            Object.assign(componentObject, country && { country });

            return componentObject;
          })
          .filter((addressComponent) => Object.keys(addressComponent).length)
          .reduce((prev, curr) => {
            prev = {
              ...prev,
              ...curr,
            };
            return prev;
          }, {});
        console.log(addressComponents);
        return {
          components: addressComponents,
          formattedAddress: address.formatted_address || '',
          placeId: address.place_id || '',
          latitude: String(address.geometry.location.lat || ''),
          longitude: String(address.geometry.location.lng || ''),
        };
      });
      return addresses[0] as any;
    } catch (error) {
      this.loggerProvider.error(
        'MapsProvider - geocodeInverseSearchByCoordinates',
        {
          response: error?.response?.data,
          requestPath: error?.request?.path,
          message: error?.message,
        },
      );
      throw new CustomException(GOOGLE_API_GEOCODING_ERROR);
    }
  }

  async geocodeSearchByAddress({
    address,
    city,
    district,
    number,
    placeId,
    state,
    zipcode,
    latitude,
    longitude,
  }: MapsGeoCodeSearchAddressParamsDto): Promise<any> {
    const apiKey = `key=${this.apiKey}`;
    const language = `language=${GOOGLE_LANGUAGE_ACCEPT.BRAZIL}`;
    const region = `region=.br`;

    const pathAddress = this.formatParamsToFind({
      address,
      city,
      district,
      number,
      placeId,
      state,
      zipcode,
      latitude,
      longitude,
    });

    const pathParams = `${apiKey}&${pathAddress}&${language}&${region}`;

    //location=39.6034810,-119.6822510

    const urlEncoded = new URL(
      `${this.baseURL}/geocode/json?${pathParams}`,
    ).toString();

    try {
      const { data } = await firstValueFrom(
        this.httpInterceptorProvider.get<GoogleGeocodeResponse>(urlEncoded),
      );

      if (data.status === GOOGLE_GEOCODING_STATUS.ZERO_RESULTS) {
        this.loggerProvider.warn(
          'MapsProvider - geocodeSearchAddressByName - Address not found',
          {
            address,
          },
        );

        return [];
      }
      const addressesFormatters = data.results.map((result) => {
        return {
          address: result.formatted_address,
          placeId: result.place_id,
        };
      });
      return addressesFormatters;
    } catch (error) {
      this.loggerProvider.error('MapsProvider - geocodeSearchAddressByName', {
        response: error?.response?.data,
        requestPath: error?.request?.path,
        message: error?.message,
      });
      throw new CustomException(GOOGLE_API_GEOCODING_ERROR);
    }
  }

  private formatParamsToFind({
    latitude,
    longitude,
    placeId,
    address,
    city,
    district,
    number,
    state,
    zipcode,
  }: MapsGeoCodeSearchAddressParamsDto): string {
    if (placeId) {
      const pathPlaceId = `place_id=${placeId}`;
      return `&${pathPlaceId}`;
    }

    if (latitude && longitude) {
      const latitudeLongitude = `${latitude}, ${longitude}`;
      const pathLocation = `latlng=${latitudeLongitude}`;
      return `&${pathLocation}`;
    }

    let pathAddress = `address=`;

    if (number) {
      pathAddress += number;
    }

    if (address) {
      pathAddress += '+' + address;
    }

    if (district) {
      pathAddress += ',+' + district;
    }

    if (city) {
      pathAddress += ',+' + city;
    }

    if (state) {
      pathAddress += ',+' + state;
    }

    if (zipcode) {
      const pathZipCode = `zipcode=${address}`;
      pathAddress += `&${pathZipCode}`;
    }
    const locationType = `location_type=${GOOGLE_LOCATION_TYPE.ROOFTOP}`;
    const resultType = `result_type=${GOOGLE_RESULT_TYPES.STREET_ADDRESS}|${GOOGLE_RESULT_TYPES.NEIGHBORHOOD}|${GOOGLE_RESULT_TYPES.POSTAL_CODE}`;
    return pathAddress + '&' + resultType + '&' + locationType;
  }
}
