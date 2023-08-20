import { Address } from '@src/modules/address/address.entity';
import { AddressDto } from '@src/modules/address/dto/address.dto';
import { ImageDto } from '@src/modules/image/dto/image.dto';
import { Image } from '@src/modules/image/image.entity';
import { PhoneDto } from '@src/modules/phone/dto/phone.dto';
import { Phone } from '@src/modules/phone/phone.entity';
import { TermDto } from '@src/modules/term/dto/term.dto';
import { Term } from '@src/modules/term/term.entity';
import { UserDto } from '@src/modules/user/dto/user.dto';
import { User } from '@src/modules/user/entities/user.entity';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { NameCacheKeyFlow } from '../client.constant';

export class ClientCacheCreateServiceParamsDto {
  @ValidateNested()
  @IsOptional()
  user: UserDto;

  @IsOptional()
  @ValidateNested()
  address: AddressDto;

  @IsOptional()
  @ValidateNested()
  phone: PhoneDto;

  @IsOptional()
  @ValidateNested()
  image: ImageDto;

  @IsOptional()
  @ValidateNested()
  term: TermDto;

  @IsString({ message: 'key to cache need format string' })
  key: NameCacheKeyFlow;
}

export interface ClientCacheCreateParamsDto {
  user: Partial<User>;
  phone: Partial<Phone>;
  address: Partial<Address>;
  photo: Partial<Image>;
  term: Partial<Term>;
}
