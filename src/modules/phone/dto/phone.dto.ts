import { isValidCPF } from '@src/utils/is-valid-cpf';
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

  @ValidateIf((value) => isValidCPF(value))
  number: string;
}
