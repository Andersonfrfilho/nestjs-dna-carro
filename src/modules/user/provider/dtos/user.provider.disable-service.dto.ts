import { IsUUID } from 'class-validator';

export class UserProviderServiceDisableParamsDto {
  @IsUUID()
  serviceId: string;
}

export class UserProviderServiceDisableServiceParamsDto extends UserProviderServiceDisableParamsDto {
  @IsUUID()
  providerId: string;
}

export class UserProviderServiceDisableControllerParamsDto extends UserProviderServiceDisableParamsDto {}
