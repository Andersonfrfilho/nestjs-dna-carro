import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from './logger.provider.interface';

interface RequestInfo {
  method: string;
  url: string;
  query: any;
  body: any;
  headers: any;
  statusCode: number;
}

export interface Response<T> {
  data: T;
}

@Injectable()
export class LoggerResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: LoggerProviderInterface,
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const requestId = request.id;
    const statusCode = http.getResponse().statusCode;
    const data = this.makeRequestResponseInfo(request, statusCode);
    return next.handle().pipe(
      map((responseData) => {
        this.logger.info('LoggerRequestInterceptor - log', {
          ...responseData,
          requestId,
          statusCode,
        });
        return responseData;
      }),
    );
  }

  private makeRequestResponseInfo(
    request: any,
    statusCode: number,
  ): RequestInfo {
    return {
      method: request.method,
      url: request.url,
      query: request.query,
      body: request.body,
      headers: request.headers,
      statusCode,
    };
  }
}
