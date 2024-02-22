import { HttpStatusCode } from 'axios';

export const TOKEN_NOT_FOUND = {
  code: 1036,
  message: 'TOKEN_NOT_FOUND',
  statusCode: HttpStatusCode.Unauthorized,
};

export const INVALID_TOKEN = {
  code: 1037,
  message: 'INVALID_TOKEN',
  statusCode: HttpStatusCode.Unauthorized,
};

export const BEARER_TOKEN_MALFORMED = {
  code: 1037,
  message: 'BEARER_TOKEN_MALFORMED',
  statusCode: HttpStatusCode.Unauthorized,
};
