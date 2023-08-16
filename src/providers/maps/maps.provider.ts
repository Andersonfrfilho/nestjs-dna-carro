import { HttpService } from '@nestjs/axios';
import { MapsProviderInterface } from './maps.provider.interface';
import config from '@src/config';

export class MapsProvider implements MapsProviderInterface {
  private apiKey: string;
  constructor(private readonly httpService: HttpService) {
    this.apiKey = config.maps.apiKey;
  }
  async geocodeSearchAddressByName(address: string): Promise<string> {
    const apiKey = `key=${this.apiKey}`;
    const pathAddress = `address=${address}`;
    const pathParams = `${apiKey}&${pathAddress}`;
    const data = await this.httpService.axiosRef.get(
      `/geocode/json?${pathParams}`,
    );
    console.log(data);
    return 'asdasdf';
  }
}
