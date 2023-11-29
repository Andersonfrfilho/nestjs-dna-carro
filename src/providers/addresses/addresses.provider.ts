import { firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { CustomException } from '@src/error/custom.exception';
import { CEP_API_ERROR } from '@src/error/error.constant';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '../logger/logger.provider.interface';
import {
  HTTP_INTERCEPTOR_PROVIDER,
  HttpInterceptorProviderInterface,
} from '../http/http.interceptor.interface';

import { AddressesProviderInterface } from './addresses.provider.interface';
import { FindAddressByCepResultDto } from './addresses.dto';

@Injectable()
export class AddressesProvider implements AddressesProviderInterface {
  private baseURL: string;
  constructor(
    @Inject(HTTP_INTERCEPTOR_PROVIDER)
    private readonly httpInterceptorProvider: HttpInterceptorProviderInterface,
    @Inject(LOGGER_PROVIDER)
    private readonly loggerProvider: LoggerProviderInterface,
  ) {
    this.baseURL = 'https://viacep.com.br/ws';
  }
  async findAddressByCep(cep: string): Promise<FindAddressByCepResultDto> {
    const urlEncoded = new URL(`${this.baseURL}/${cep}/json/`).toString();

    try {
      const { data } = await firstValueFrom(
        this.httpInterceptorProvider.get<FindAddressByCepResultDto>(urlEncoded),
      );

      return data;
    } catch (error) {
      this.loggerProvider.error('AddressesProvider - findAddressByCep', {
        response: error?.response?.data,
        requestPath: error?.request?.path,
        message: error?.message,
      });
      throw new CustomException(CEP_API_ERROR);
    }
  }
}
