import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export const HTTP_INTERCEPTOR_PROVIDER = 'HTTP_INTERCEPTOR_PROVIDER';

export interface HttpInterceptorProviderInterface {
  get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>>;
  delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>>;
  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>>;
  put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>>;
  patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>>;
}
