import { ValidationError } from 'class-validator';
import { ExceptionCustom } from './exception.custom';
import { VALIDATION_FIELDS_REQUEST_ERROR } from './error.constant';

export const validationFactoryError = (
  validationErrors: ValidationError[] = [],
) => {
  const contents = validationErrors.map((validate) => ({
    property: validate.property,
    message: !!validate.constraints && Object.values(validate.constraints),
  }));

  return new ExceptionCustom({
    code: VALIDATION_FIELDS_REQUEST_ERROR.code,
    message: VALIDATION_FIELDS_REQUEST_ERROR.message,
    contents,
    statusCode: VALIDATION_FIELDS_REQUEST_ERROR.statusCode,
  });
};
