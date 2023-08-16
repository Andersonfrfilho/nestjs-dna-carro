import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MAPS_PROVIDER } from './maps.provider.interface';
import { MapsProvider } from './maps.provider';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: 'https://maps.googleapis.com/maps/api',
    }),
  ],
  providers: [
    {
      provide: MAPS_PROVIDER,
      useClass: MapsProvider,
    },
  ],
  exports: [MAPS_PROVIDER],
})
export class MapsModule {}
