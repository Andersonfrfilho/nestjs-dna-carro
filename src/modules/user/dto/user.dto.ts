import { GENDER } from '@src/commons/enum.common';
import { isValidCPF } from '@src/utils/is-valid-cpf';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class UserRelationshipDTO {
  @IsUUID(undefined, { message: 'userId need format in uuid valid' })
  userId: string;
}

export class UserDTO {
  @MaxLength(30, { message: 'name need height max 30 characters' })
  @MinLength(3, { message: 'name need height min 3 characters' })
  @IsString({ message: 'name need format in string valid' })
  name: string;

  @MaxLength(60, { message: 'name need height max 60 characters' })
  @MinLength(3, { message: 'name need height min 3 characters' })
  @IsString({ message: 'last name need format in string valid' })
  lastName: string;

  @ValidateIf((value) => isValidCPF(value), {
    message: 'Cpf property is invalid try other value',
  })
  @IsString({ message: 'cpf need format in string valid' })
  cpf: string;

  @IsEmail({}, { message: 'email need format in email valid' })
  email: string;

  @IsEnum(GENDER, { message: 'gender need to be value M or F' })
  gender: string;

  @IsObject()
  @IsOptional()
  details: any;

  @IsNumber({}, { message: 'gender need to be value M or F' })
  birthDate: number;
}
