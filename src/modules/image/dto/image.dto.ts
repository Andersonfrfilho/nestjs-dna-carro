import { IsNumber, IsString } from 'class-validator';

export class AddressRelationshipDto {
  @IsNumber()
  addressId: number;
}

export class ImageDto {
  @IsString()
  name: string;

  @IsString()
  url: string;
}
