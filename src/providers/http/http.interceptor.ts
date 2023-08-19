import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, OperatorFunction } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpInterceptorProviderInterface } from './http.interceptor.interface';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '../logger/logger.provider.interface';
import { CustomException } from '@src/error/custom.exception';
import {
  NOT_FOUND_HTTP_INTERCEPTOR,
  TIMEOUT_HTTP_INTERCEPTOR,
} from '@src/error/error.constant';
import { HTTP_SERVICE_AXIOS_ERROR } from './http.constant';

@Injectable()
export class HttpInterceptorProvider
  extends HttpService
  implements HttpInterceptorProviderInterface
{
  constructor(
    @Inject(LOGGER_PROVIDER) private logger: LoggerProviderInterface,
  ) {
    super();
  }

  public get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    this.logger.info('HttpLoggingService - GET - REQUEST', {
      params: {
        url,
        config,
      },
    });

    return super
      .get(url, config)
      .pipe(
        this.tap('HttpLoggingService - GET - RESPONSE'),
        this.catchError('HttpLoggingService - GET - RESPONSE - error'),
      );
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    this.logger.info('HttpLoggingService - DELETE - REQUEST', {
      params: {
        url,
        config,
      },
    });

    return super
      .delete(url, config)
      .pipe(
        this.tap('HttpLoggingService - DELETE - RESPONSE'),
        this.catchError('HttpLoggingService - DELETE - RESPONSE - error'),
      );
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    this.logger.info('HttpLoggingService - POST - REQUEST', {
      params: {
        url,
        data,
        config,
      },
    });

    return super
      .post(url, data, config)
      .pipe(
        this.tap('HttpLoggingService - POST - RESPONSE'),
        this.catchError('HttpLoggingService - POST - RESPONSE - error'),
      );
  }

  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    this.logger.log('HttpLoggingService - PUT - REQUEST', {
      params: {
        url,
        data,
        config,
      },
    });

    return super
      .put(url, data, config)
      .pipe(
        this.tap('HttpLoggingService - PUT - RESPONSE'),
        this.catchError('HttpLoggingService - PUT - RESPONSE - error'),
      );
  }

  public patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    this.logger.info('HttpLoggingService - PATCH - REQUEST', {
      params: {
        url,
        data,
        config,
      },
    });

    return super
      .patch(url, data, config)
      .pipe(
        this.tap('HttpLoggingService - PATCH - RESPONSE'),
        this.catchError('HttpLoggingService - PATCH - RESPONSE - error'),
      );
  }

  private catchError(
    message: string,
  ): OperatorFunction<AxiosResponse, AxiosResponse> {
    return catchError((error: AxiosError) => {
      const { response, code, request } = error;
      if (code === HTTP_SERVICE_AXIOS_ERROR.NOT_FOUND) {
        this.logger.error('HttpInterceptorProvider - catchError', {
          ...NOT_FOUND_HTTP_INTERCEPTOR,
          params: {
            data: response?.data,
            status: response?.status,
            method: request?.method,
          },
        });

        return Promise.reject(new CustomException(NOT_FOUND_HTTP_INTERCEPTOR));
      }

      if (code === HTTP_SERVICE_AXIOS_ERROR.NOT_FOUND) {
        this.logger.error('HttpInterceptorProvider - catchError', {
          ...TIMEOUT_HTTP_INTERCEPTOR,
          params: {
            data: response?.data,
            status: response?.status,
            method: request?.method,
          },
        });

        return Promise.reject(new CustomException(TIMEOUT_HTTP_INTERCEPTOR));
      }

      this.logger.error(message, {
        params: {
          data: response?.data,
          status: response?.status,
          method: request?.method,
        },
      });

      return Promise.reject(error);
    });
  }

  private tap(message: string) {
    return tap((response: AxiosResponse) =>
      this.logger.info(message, {
        params: {
          data: response.data,
          headers: response.headers,
          status: response.status,
        },
      }),
    );
  }
}
