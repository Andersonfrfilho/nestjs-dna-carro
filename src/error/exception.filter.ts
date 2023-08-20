import {
  Catch,
  ArgumentsHost,
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { CustomException } from './custom.exception';
import {
  GENERIC_INTERNAL_SERVER_ERROR,
  NOT_FOUND_ROUTE_API,
} from './error.constant';
import {
  LOGGER_PROVIDER,
  LoggerProviderInterface,
} from '@src/providers/logger/logger.provider.interface';

@Injectable()
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: LoggerProviderInterface,
  ) {
    super();
  }

  catch(exception: Error, host: ArgumentsHost): unknown {
    const http = host.switchToHttp();
    const response = http.getResponse();

    this.logger.error('AllExceptionsFilter - catch', {
      exception,
    });

    if (exception instanceof NotFoundException) {
      const error = new CustomException(NOT_FOUND_ROUTE_API(exception.message));
      return response.status(error.statusCode).send(error);
    }
    if (exception instanceof CustomException) {
      return response.status(exception.statusCode).send({
        code: exception.code,
        message: exception.message,
        contents: exception.contents,
      });
    }

    return response.status(GENERIC_INTERNAL_SERVER_ERROR.statusCode).send({
      code: GENERIC_INTERNAL_SERVER_ERROR.code,
      message: GENERIC_INTERNAL_SERVER_ERROR.message,
    });
  }
}
