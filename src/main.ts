import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import configEnvs from '@config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './modules/swagger/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { LOGGER_PROVIDER } from './providers/logger/logger.provider.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(app.get(LOGGER_PROVIDER));
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);

  await app.listen(configEnvs.api.port, '0.0.0.0');
}
bootstrap();
