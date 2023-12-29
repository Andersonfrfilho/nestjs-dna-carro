import { IsArray, IsEnum } from 'class-validator';
import { HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD } from '../user.provider.constant';

class HoursAvailable {
  @IsEnum(HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD)
  start: HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD;

  @IsEnum(HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD)
  end: HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD;
}

export class UserProviderHoursAvailableParamsDto {
  @IsArray()
  hours: HoursAvailable[];
}

export interface UserProviderHoursAvailableServiceParamsDto
  extends UserProviderHoursAvailableParamsDto {
  providerId: string;
}

export class UserProviderHoursAvailableControllerBodyParamsDto extends UserProviderHoursAvailableParamsDto {}
