import { GENDER } from '@src/commons/enum.common';
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
} from 'class-validator';

export class UserRelationshipDto {
  @IsUUID(undefined, { message: 'userId need format in uuid valid' })
  userId: string;
}

export class UserDto {
  @MaxLength(30, { message: 'name need height max 30 characters' })
  @MinLength(3, { message: 'name need height min 3 characters' })
  @IsString({ message: 'name need format in string valid' })
  name: string;

  @MaxLength(60, { message: 'name need height max 60 characters' })
  @MinLength(3, { message: 'name need height min 3 characters' })
  @IsString({ message: 'last name need format in string valid' })
  lastName: string;

  @IsString({ message: 'document need format in string valid' })
  document: string;

  @IsString({ message: 'documentType need format in string valid' })
  documentType: string;

  @IsString({ message: 'password need format in string valid' })
  password: string;

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

export interface UpdatePasswordByEmailParamsDto {
  email: string;
  passwordHash: string;
}
