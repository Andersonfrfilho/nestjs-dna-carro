import { IsEnum } from 'class-validator';
import { DAYS_WEEK } from '../user.provider.constant';

export class UserProviderDaysAvailableParamsDto {
  @IsEnum(DAYS_WEEK)
  days: DAYS_WEEK[];
}

export interface UserProviderDaysAvailableServiceParamsDto
  extends UserProviderDaysAvailableParamsDto {
  providerId: string;
}

export class UserProviderDaysAvailableControllerParamsBodyDto extends UserProviderDaysAvailableParamsDto {}
