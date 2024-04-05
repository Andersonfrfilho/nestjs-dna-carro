import { GENDERS } from '@src/commons/enum.common';
import { NameSessionTypeFlow } from '@src/modules/auth/auth.constant';
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
import { User } from '../entities/user.entity';

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

  @IsEnum(GENDERS, { message: 'gender need to be value M or F' })
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

export class FindByPhoneActiveUserParamsDto {
  @IsString({ message: 'country code need format in string valid' })
  countryCode: string;
  @IsString({ message: 'ddd need format in string valid' })
  ddd: string;
  @IsString({ message: 'number need format in string valid' })
  number: string;
}

export class FindByDocumentActiveUserParamsDto {
  @IsString({ message: 'document need format in string valid' })
  document: string;
  @IsEnum(NameSessionTypeFlow, {
    message: 'documentType need format in string valid',
  })
  documentType: NameSessionTypeFlow;
}

export class UserGetTypesServiceParamsDto {
  userId: string;
}

export class UserGetTypesControllerResponseDto extends User {}
