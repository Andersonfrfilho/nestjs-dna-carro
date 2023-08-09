import { isValidCPF } from '@src/utils/is-valid-cpf';
import { IsString, IsUUID, ValidateIf } from 'class-validator';

export class PhoneRelationshipDTO {
  @IsUUID()
  phoneId: string;
}

export class PhoneDTO {
  @IsString()
  countryCode: string;

  @IsString()
  ddd: string;

  @ValidateIf((value) => isValidCPF(value))
  number: string;
}
