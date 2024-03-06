import { IsArray, IsBoolean, IsEnum, IsString } from 'class-validator';
import { HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD } from '../user.provider.constant';

export class AvailabilitiesHoursItems {
  @IsString()
  id: string;
  @IsString()
  hour: string;
  @IsBoolean()
  selected: boolean;
}

class AvailabilitiesHours {
  @IsEnum(HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD)
  start: HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD;

  @IsEnum(HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD)
  end: HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD;
}

export class UserProviderCreateAvailabilitiesHoursParamsDto {
  @IsArray()
  hours: AvailabilitiesHours[];
}

export interface UserProviderCreateAvailabilitiesHoursServiceParamsDto
  extends UserProviderCreateAvailabilitiesHoursParamsDto {
  providerId: string;
}

export class UserProviderCreateAvailabilitiesHoursServiceResultDto extends AvailabilitiesHoursItems {}

export class UserProviderCreateAvailabilitiesHoursControllerBodyParamsDto extends UserProviderCreateAvailabilitiesHoursParamsDto {}

export class UserProviderCreateAvailabilitiesHoursControllerResultDto extends AvailabilitiesHoursItems {}

export class UserProviderGetAvailabilitiesHoursServiceParamsDto {
  providerId: string;
}

export class UserProviderGetAvailabilitiesHoursServiceResultDto extends AvailabilitiesHoursItems {}

export class UserProviderGetAvailabilitiesHoursControllerResultDto extends AvailabilitiesHoursItems {}
