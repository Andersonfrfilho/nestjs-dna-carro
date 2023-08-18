import { HttpStatusCode } from 'axios';

export enum NameErrorCacheInformationFlow {
  all = 'all',
  user = 'user',
  phone = 'phone',
  address = 'address',
  term = 'term',
  photo = 'photo',
}

export const NOT_FOUND_CACHE_INFORMATION = (
  nameFlow = NameErrorCacheInformationFlow.all,
) => ({
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
  code: 1005,
  message: 'GOOGLE_API_GEOCODING_ERROR',
  statusCode: HttpStatusCode.BadRequest,
};
