import { IsNumber, IsString } from 'class-validator';

export class AddressRelationshipDTO {
  @IsNumber()
  addressId: number;
}

export class ImageDTO {
  @IsString()
  name: string;

  @IsString()
  url: string;
}
