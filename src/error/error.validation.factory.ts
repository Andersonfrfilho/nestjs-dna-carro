import { ValidationError } from 'class-validator';
import { CustomException } from './custom.exception';
import { VALIDATION_FIELDS_REQUEST_ERROR } from './error.constant';

export const validationFactoryError = (
  validationErrors: ValidationError[] = [],
) => {
  console.log('####################-valiation');
  const contents = validationErrors.map((validate) => ({
    property: validate.property,
    message: !!validate.constraints && Object.values(validate.constraints),
  }));

  throw new CustomException({
    code: VALIDATION_FIELDS_REQUEST_ERROR.code,
    message: VALIDATION_FIELDS_REQUEST_ERROR.message,
    contents,
    statusCode: VALIDATION_FIELDS_REQUEST_ERROR.statusCode,
  });
};
