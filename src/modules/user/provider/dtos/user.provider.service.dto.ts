import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserProviderCreateServiceParamsDto {
  @IsString({ message: 'name must be a string' })
  name: string;

  @IsNumber({}, { message: 'amount must be a number' })
  amount: number;

  @IsNumber({}, { message: 'duration must be a number' })
  duration: number;

  @IsOptional()
  details: any;

  @IsBoolean()
  active: boolean;
}

export class UserProviderCreateServiceServiceParamsDto extends UserProviderCreateServiceParamsDto {
  @IsString({ message: 'providerId must be a string' })
  providerId: string;
}
export class UserProviderCreateServiceControllerParamsBodyDto extends UserProviderCreateServiceParamsDto {}

export class UserProviderServiceDisableRepositoryParamsDto {
  @IsUUID()
  serviceId: string;

  @IsUUID()
  providerId: string;
}
