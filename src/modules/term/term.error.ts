import { HttpStatusCode } from 'axios';

export const TERM_VERSION_ALREADY_EXIST = {
  code: 1011,
  message: 'TERM_VERSION_ALREADY_EXIST',
  statusCode: HttpStatusCode.BadRequest,
};
