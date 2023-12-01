import { PhoneCacheCreateDto } from '@src/modules/phone/dto/phone.dto';
import { IsOptional, ValidateNested } from 'class-validator';

export class ClientCreateDto {
  @IsOptional()
  @ValidateNested()
  phone: PhoneCacheCreateDto;
}

export class ClientCreateControllerParamsDto extends ClientCreateDto {}

export class ClientCreateServiceParamsDto extends ClientCreateDto {}
