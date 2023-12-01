import { HttpStatusCode } from 'axios';

export const TERM_VERSION_ALREADY_EXIST = {
  code: 1025,
  message: 'TERM_VERSION_ALREADY_EXIST',
  statusCode: HttpStatusCode.BadRequest,
};

export const TERM_NOT_FOUND = {
  code: 1026,
  message: 'TERM_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};
