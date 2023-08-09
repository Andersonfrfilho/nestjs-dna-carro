import { GENDER } from '@src/commons/enum.common';
import { isValidCPF } from '@src/utils/is-valid-cpf';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UserRelationshipDTO {
  @IsUUID()
  userId: string;
}

export class UserDTO {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @ValidateIf((value) => isValidCPF(value))
  cpf: string;

  @IsEmail()
  email: string;

  @IsEnum(GENDER)
  gender: string;

  @IsObject()
  details: any;

  @IsNumber()
  birthDate: number;
}
