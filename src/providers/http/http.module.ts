import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { HTTP_INTERCEPTOR_PROVIDER } from './http.interceptor.interface';
import { HttpInterceptorProvider } from './http.interceptor';

@Module({
  imports: [LoggerModule],
  providers: [
    { useClass: HttpInterceptorProvider, provide: HTTP_INTERCEPTOR_PROVIDER },
  ],
  exports: [HTTP_INTERCEPTOR_PROVIDER],
})
export class HttpProviderModule {}
