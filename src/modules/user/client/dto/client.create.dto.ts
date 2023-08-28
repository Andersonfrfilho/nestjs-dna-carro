import { IsString } from 'class-validator';

export class ClientCreateDto {
  @IsString()
  email: string;
}

export class ClientCreateControllerParamsDto extends ClientCreateDto {}

export class ClientCreateServiceParamsDto extends ClientCreateDto {}