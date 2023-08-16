import { FastifyReply } from 'fastify';
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ErrorCustom } from './error.custom';
import { HttpStatusCode } from 'axios';
import { GENERIC_INTERNAL_SERVER_ERROR } from './error.constant';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): unknown {
    const http = host.switchToHttp();
    const response = http.getResponse<FastifyReply>();

    if (exception instanceof ErrorCustom) {
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
