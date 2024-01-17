import { HttpStatusCode } from 'axios';

export const APPOINTMENT_NOT_FOUND = {
  code: 1044,
  message: 'APPOINTMENT_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const APPOINTMENT_NOT_HAS_PROVIDER = {
  code: 1045,
  message: 'APPOINTMENT_NOT_HAS_PROVIDER',
  statusCode: HttpStatusCode.NotFound,
};
