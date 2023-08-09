import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dev } from '@config/dev';
import { stg } from '@config/stg';
import { prod } from '@config/prod';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dev, stg, prod],
    }),
  ],
})
export class ConfigEnvsModule {}
