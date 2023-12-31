import { HttpStatusCode } from 'axios';

export const NOT_FOUND_ROUTE_API = (nameRoute = '') => ({
  code: 1011,
  message: `Not found ${nameRoute}`,
  statusCode: HttpStatusCode.NotFound,
});

export const NOT_FOUND_CACHE_INFORMATION = (nameFlow = '') => ({
  code: 1001,
  message: `Not found cache information for save retry flow ${nameFlow}`,
  statusCode: HttpStatusCode.NotFound,
});

export const TERM_NOT_FOUND = {
  code: 1002,
  message: 'Term not found',
  statusCode: HttpStatusCode.NotFound,
};

export const TYPE_USER_NOT_FOUND = {
  code: 1003,
  message: 'Type user not found',
  statusCode: HttpStatusCode.NotFound,
};

export const VALIDATION_FIELDS_REQUEST_ERROR = {
  code: 1004,
  message: 'Some validation field has an error',
  statusCode: HttpStatusCode.BadRequest,
};

export const GENERIC_INTERNAL_SERVER_ERROR = {
  code: 5000,
  message: 'Internal server error',
  statusCode: HttpStatusCode.InternalServerError,
};

export const GOOGLE_API_GEOCODING_ADDRESS_NOT_FOUND = {
  code: 1005,
  message: 'Address not found',
  statusCode: HttpStatusCode.NotFound,
};

export const GOOGLE_API_GEOCODING_ERROR = {
  code: 1006,
  message: 'GOOGLE_API_GEOCODING_ERROR',
  statusCode: HttpStatusCode.BadRequest,
};

export const NOT_FOUND_HTTP_INTERCEPTOR = {
  code: 1007,
  message: 'NOT_FOUND_HTTP_INTERCEPTOR',
  statusCode: HttpStatusCode.NotFound,
};

export const TIMEOUT_HTTP_INTERCEPTOR = {
  code: 1008,
  message: 'TIMEOUT_HTTP_INTERCEPTOR',
  statusCode: HttpStatusCode.RequestTimeout,
};

export const EMAIL_ALREADY_EXIST = {
  code: 1009,
  message: 'EMAIL_ALREADY_EXIST',
  statusCode: HttpStatusCode.BadRequest,
};

export const EMAIL_NOT_FOUND = {
  code: 1010,
  message: 'EMAIL_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const CEP_API_ERROR = {
  code: 1011,
  message: 'CEP_API_ERROR',
  statusCode: HttpStatusCode.BadRequest,
};
