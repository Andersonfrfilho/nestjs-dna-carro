import { IsArray, IsEnum, IsString } from 'class-validator';
import { DAYS_WEEK } from '../user.provider.constant';
import { ProviderAvailableDay } from '../entities/provider-available-days.entity';

export class UserProviderCreateAvailableDaysParamsDto {
  @IsArray({ message: 'Days must be an array' })
  days: DAYS_WEEK[];
}

export interface UserProviderCreateAvailableDaysServiceParamsDto
  extends UserProviderCreateAvailableDaysParamsDto {
  providerId: string;
}

export class UserProviderCreateAvailableDaysControllerParamsBodyDto extends UserProviderCreateAvailableDaysParamsDto {}

export class UserProviderCreateAvailableDaysControllerResultDto extends ProviderAvailableDay {}

export class UserProviderGetAvailableDaysDto {
  @IsString({ message: 'ProviderId must be a string' })
  providerId: string;
}

export class UserProviderGetAvailableDaysServiceParamsDto extends UserProviderGetAvailableDaysDto {}

export class UserProviderGetAvailableDaysControllerParamsDto extends UserProviderGetAvailableDaysDto {}

export class UserProviderGetAvailableDaysServiceResultDto extends ProviderAvailableDay {}

export class UserProviderGetAvailableDaysControllerResponseDto extends ProviderAvailableDay {}
