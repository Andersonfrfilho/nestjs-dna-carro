import { HttpService } from '@nestjs/axios';
import { MapsProviderInterface } from './maps.provider.interface';
import config from '@src/config';
import { firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { CustomException } from '@src/error/custom.exception';
import { GOOGLE_API_GEOCODING_ERROR } from '@src/error/error.constant';
import {
  GOOGLE_COUNTRY_CODE_ISO_3166_1,
  GOOGLE_GEOCODING_STATUS,
  GOOGLE_LANGUAGE_ACCEPT,
} from './maps.constant';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '../logger/logger.provider.interface';
import { MapsGeoCodeSearchAddressParamsDTO } from './maps.geocodeSearchAddress.dto';

@Injectable()
export class MapsProvider implements MapsProviderInterface {
  private apiKey: string;
  constructor(
    private readonly httpService: HttpService,
    @Inject(LOGGER_PROVIDER)
    private readonly loggerProvider: LoggerProviderInterface,
  ) {
    this.apiKey = config.maps.apiKey;
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
    let pathAddress = `address=`;
    if (address) {
      pathAddress += address;
    }

    if (number) {
      pathAddress += number;
    }

    if (district) {
      pathAddress += ' - ' + district;
    }

    if (city) {
      pathAddress += ' - ' + city;
    }

    if (state) {
      pathAddress += ' - ' + state;
    }
    //location=39.6034810,-119.6822510
    let latitudeLongitude = '';
    if (latitude && longitude) {
      latitudeLongitude = `${latitude}, ${longitude}`;
    }

    const pathLocation = `location=${latitudeLongitude}`;
    const pathZipCode = `zipcode=${address}`;
    const pathPlaceId = `place_id=${placeId}`;
    // const componentRestrictions = `component_restrictions.country=${GOOGLE_COUNTRY_CODE_ISO_3166_1.BRAZIL}`;
    const language = `language=${GOOGLE_LANGUAGE_ACCEPT.BRAZIL}`;
    const region = `region=.br`;
    const result_type = `result_type=street_address|neighborhood|postal_code`;
    const locationType = `location_type=ROOFTOP`;
    const pathParams = `${apiKey}&${pathPlaceId}&${pathLocation}&${pathAddress}&${pathZipCode}&${language}&${region}&${result_type}&${locationType}`;
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`/geocode/json?${pathParams}`).pipe(),
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
      return data;
    } catch (error) {
      this.loggerProvider.error('MapsProvider - geocodeSearchAddressByName', {
        response: error?.response?.data,
        requestPath: error?.request?.path,
      });
      throw new CustomException(GOOGLE_API_GEOCODING_ERROR);
    }
  }
}
