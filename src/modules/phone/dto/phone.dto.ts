import { isValidPhoneNumber } from '@src/utils/is-valid-phone-number';
import { IsString, IsUUID, ValidateIf } from 'class-validator';

export class PhoneRelationshipDto {
  @IsUUID()
  phoneId: string;
}

export class PhoneDto {
  @IsString()
  countryCode: string;

  @IsString()
  ddd: string;

  @ValidateIf((value) => isValidPhoneNumber(value))
  number: string;
}
