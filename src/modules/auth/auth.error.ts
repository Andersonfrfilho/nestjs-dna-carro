import { HttpStatusCode } from 'axios';

export const USER_NOT_FOUND = {
  code: 1030,
  message: 'USER_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const INVALID_PASSWORD = {
  code: 1031,
  message: 'INVALID_PASSWORD',
  statusCode: HttpStatusCode.Forbidden,
};
