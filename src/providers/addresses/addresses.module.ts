import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { HttpProviderModule } from '../http/http.module';
import { ADDRESSES_PROVIDER } from './addresses.provider.interface';
import { AddressesProvider } from './addresses.provider';

@Module({
  imports: [HttpProviderModule, LoggerModule],
  providers: [
    {
      provide: ADDRESSES_PROVIDER,
      useClass: AddressesProvider,
    },
  ],
  exports: [ADDRESSES_PROVIDER],
})
export class AddressesModule {}
