import { HttpStatusCode } from 'axios';

export const CACHE_GET_ERROR = {
  code: 1022,
  message: `CACHE_GET_ERROR`,
  statusCode: HttpStatusCode.NotFound,
};
