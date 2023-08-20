import { Module } from '@nestjs/common';
import { MAPS_PROVIDER } from './maps.provider.interface';
import { MapsProvider } from './maps.provider';
import { LoggerModule } from '../logger/logger.module';
import { HttpProviderModule } from '../http/http.module';

@Module({
  imports: [HttpProviderModule, LoggerModule],
  providers: [
    {
      provide: MAPS_PROVIDER,
      useClass: MapsProvider,
    },
  ],
  exports: [MAPS_PROVIDER],
})
export class MapsModule {}
