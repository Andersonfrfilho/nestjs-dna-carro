import { HttpStatusCode } from 'axios';

export const CACHE_GET_ERROR = {
  code: 1031,
  message: `User does not have any information in the registration flow cache`,
  statusCode: HttpStatusCode.NotFound,
};
