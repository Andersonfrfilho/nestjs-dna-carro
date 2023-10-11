import { Module } from '@nestjs/common';
import { STORAGE_PROVIDER } from './storage.provider.interface';
import { StorageProvider } from './storage.provider';
import { LoggerModule } from '../logger/logger.module';
import { HttpProviderModule } from '../http/http.module';

@Module({
  imports: [HttpProviderModule, LoggerModule],
  providers: [
    {
      provide: STORAGE_PROVIDER,
      useClass: StorageProvider,
    },
  ],
  exports: [STORAGE_PROVIDER],
})
export class StorageModule {}
