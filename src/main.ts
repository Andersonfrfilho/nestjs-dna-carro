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
import { AllExceptionsFilter } from './error/exception.filter';

import { validationFactoryError } from './error/error.validation.factory';
import config from '@config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useLogger(app.get(LOGGER_PROVIDER));
  app
    .useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: validationFactoryError,
      }),
    )
    .useGlobalFilters(new AllExceptionsFilter(app.get(LOGGER_PROVIDER)));
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);
  console.log(JSON.stringify(config));
  await app.listen(configEnvs.api.port, '0.0.0.0');
}
bootstrap();
