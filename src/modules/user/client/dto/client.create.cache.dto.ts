import { Address } from '@src/modules/address/address.entity';
import { AddressDto } from '@src/modules/address/dto/address.dto';
import { Image } from '@src/modules/image/image.entity';
import { PhoneDto } from '@src/modules/phone/dto/phone.dto';
import { Phone } from '@src/modules/phone/phone.entity';
import { TermDto } from '@src/modules/term/dto/term.dto';
import { Term } from '@src/modules/term/term.entity';
import { UserDto } from '@src/modules/user/dto/user.dto';
import { User } from '@src/modules/user/entities/user.entity';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { NameCacheKeyFlow } from '../client.constant';

class TermCreateCacheDto extends TermDto {
  @IsNumber()
  id: number;
}

class ImageBase64CreateCacheDto {
  @IsOptional()
  @IsString()
  base64: string;
}
class ClientCreateUserInfo extends UserDto {
  @ValidateNested()
  @IsOptional()
  phone: PhoneDto;
}

export class ClientCacheCreateDto {
  @ValidateNested()
  @IsOptional()
  user: ClientCreateUserInfo;

  @IsOptional()
  @ValidateNested()
  address: AddressDto;

  @IsOptional()
  @ValidateNested()
  phone: PhoneDto;

  @IsOptional()
  @ValidateNested()
  image: ImageBase64CreateCacheDto;

  @IsOptional()
  @ValidateNested()
  term: TermCreateCacheDto;
}

export interface ClientCacheCreateParamsDto {
  user: Partial<User>;
  phone: Partial<Phone>;
  address: Partial<Address>;
  photo: Partial<Image>;
  term: Partial<Term>;
}

export class ClientCacheCreateControllerParamsDto extends ClientCacheCreateDto {}

export class ClientCacheCreateServiceParamsDto extends ClientCacheCreateDto {
  @IsString({ message: 'key to cache need format string' })
  key: NameCacheKeyFlow;
}
