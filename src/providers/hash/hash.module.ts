import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { HASH_PROVIDER } from './hash.provider.interface';
import { HashProvider } from './hash.provider';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: HASH_PROVIDER,
      useClass: HashProvider,
    },
  ],
  exports: [HASH_PROVIDER],
})
export class HashModule {}
