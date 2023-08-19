import { IsNumber, IsString } from 'class-validator';

export class AddressRelationshipDto {
  @IsNumber()
  imageId: number;
}

export class AddressDto {
  @IsString()
  number: string;

  @IsString()
  zipcode: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  longitude: string;

  @IsString()
  latitude: string;

  @IsString()
  complement: string;

  @IsString()
  reference: string;

  @IsString()
  details: any;
}
