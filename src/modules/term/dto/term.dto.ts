import { isValidCPF } from '@src/utils/is-valid-cpf';
import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class TermRelationshipDTO {
  @IsNumber()
  termId: number;
}

export class TermDTO {
  @IsString()
  version: string;

  @IsString()
  description: string;
}
