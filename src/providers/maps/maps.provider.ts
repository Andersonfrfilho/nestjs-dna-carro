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
import { MapsGeoCodeSearchAddressParamsDTO } from './maps.geocodeSearchAddress.dto';
import {
  HTTP_INTERCEPTOR_PROVIDER,
  HttpInterceptorProviderInterface,
} from '../http/http.interceptor.interface';
import { GoogleGeocodeResponse } from './maps.dto';

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
  }: MapsGeoCodeSearchAddressParamsDTO): Promise<any> {
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
  }: MapsGeoCodeSearchAddressParamsDTO): string {
    let latitudeLongitude = '';

    if (placeId) {
      const pathPlaceId = `place_id=${placeId}`;
      return `&${pathPlaceId}`;
    }

    if (latitude && longitude) {
      latitudeLongitude = `${latitude}, ${longitude}`;
      const pathLocation = `location=${latitudeLongitude}`;
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
