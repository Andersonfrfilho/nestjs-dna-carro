import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Inject,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from './logger.provider.interface';
import { randomUUID } from 'crypto';

interface RequestInfo {
  method: string;
  url: string;
  query: any;
  body: any;
  headers: any;
}

@Injectable({ scope: Scope.REQUEST })
export class LoggerRequestInterceptor implements NestInterceptor {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: LoggerProviderInterface,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const requestId = this.getRequestIdHeaders(request);
    this.logger.setRequestId(requestId);
    const data = this.makeRequestInfo(request);
    this.log(data);
    return next.handle();
  }

  private log(request: any) {
    this.logger.info('LoggerRequestInterceptor - log', {
      ...request,
    });
  }

  private getRequestIdHeaders(request: any) {
    const requestId =
      request.headers['x-request-id'] ||
      request.headers['request-id'] ||
      randomUUID();
    return requestId;
  }

  private makeRequestInfo(request: any): RequestInfo {
    return {
      method: request.method,
      url: request.url,
      query: request.query,
      body: request.body,
      headers: request.headers,
    };
  }
}
