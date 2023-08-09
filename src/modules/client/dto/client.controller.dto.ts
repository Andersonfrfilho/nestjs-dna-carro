import { Address } from '@src/modules/address/address.entity';
import { AddressDTO } from '@src/modules/address/dto/address.dto';
import { ImageDTO } from '@src/modules/image/dto/image.dto';
import { Image } from '@src/modules/image/image.entity';
import { PhoneDTO } from '@src/modules/phone/dto/phone.dto';
import { Phone } from '@src/modules/phone/phone.entity';
import { TermDTO } from '@src/modules/term/dto/term.dto';
import { Term } from '@src/modules/term/term.entity';
import { UserDTO } from '@src/modules/user/dto/user.dto';
import { User } from '@src/modules/user/entities/user.entity';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class ClassClientCacheCreateParamsDTO {
  @ValidateNested()
  @IsOptional()
  user: UserDTO;

  @IsOptional()
  @ValidateNested()
  address: AddressDTO;

  @IsOptional()
  @ValidateNested()
  phone: PhoneDTO;

  @IsOptional()
  @ValidateNested()
  image: ImageDTO;

  @IsOptional()
  @ValidateNested()
  term: TermDTO;

  @IsString()
  key: string;
}

export interface ClientCacheCreateParamsDTO {
  user: Partial<User>;
  phone: Partial<Phone>;
  address: Partial<Address>;
  photo: Partial<Image>;
  term: Partial<Term>;
}
