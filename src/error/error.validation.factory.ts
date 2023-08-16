import { ValidationError } from 'class-validator';
import { ErrorCustom } from './error.custom';
import { VALIDATION_FIELDS_REQUEST_ERROR } from './error.constant';

export const validationFactoryError = (
  validationErrors: ValidationError[] = [],
) => {
  const contents = validationErrors.map((validate) => ({
    property: validate.property,
    message: validate.constraints,
  }));

  return new ErrorCustom({
    code: VALIDATION_FIELDS_REQUEST_ERROR.code,
    message: VALIDATION_FIELDS_REQUEST_ERROR.message,
    contents,
    statusCode: VALIDATION_FIELDS_REQUEST_ERROR.statusCode,
  });
};
