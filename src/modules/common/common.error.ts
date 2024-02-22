import { HttpStatusCode } from 'axios';
import { USER_TYPES } from './enums/commons.user-types.enum';

export const INVALID_INFO_USER_ID = {
  code: 1038,
  message: 'INVALID_INFO_USER_ID',
  statusCode: HttpStatusCode.BadRequest,
};

export const USER_NOT_FOUND = {
  code: 1057,
  message: 'USER_NOT_FOUND',
  statusCode: HttpStatusCode.NotFound,
};

export const USER_INVALID_INFO = {
  code: 1058,
  message: 'USER_INVALID_INFO',
  statusCode: HttpStatusCode.NotFound,
};

export const USER_IS_NOT_TYPE_REQUIRED = (userType: USER_TYPES) => ({
  code: 1059,
  message: `USER_IS_NOT_TYPE_REQUIRED_${userType}`,
  statusCode: HttpStatusCode.Forbidden,
});
