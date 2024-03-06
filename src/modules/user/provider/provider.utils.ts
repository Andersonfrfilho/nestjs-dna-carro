import { AvailabilitiesHoursItems } from './dtos/user.provider.availabilities-hours.dto';
import { ProviderAvailableHour } from './entities/provider-available-hours.entity';
import {
  DAY_TO_COMPARE,
  HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD,
  MILLISECONDS_TO_COMPARE,
  MONTH_TO_COMPARE,
  SECONDS_TO_COMPARE,
  YEAR_TO_COMPARE,
} from './user.provider.constant';

type ParamsDto = ProviderAvailableHour;

type ResultDto = AvailabilitiesHoursItems;

const BASE_NUMBER = 10;

export function getHoursByPeriodFifteenMinutes(data: ParamsDto[]): ResultDto[] {
  return Object.keys(HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD).map((hour, index) => {
    const [hourSeparated, minuteSeparated] = hour.split(':');
    const isBetween = data.some((hourProvider) => {
      const [startHourProvider, startMinuteProvider] =
        hourProvider.start.split(':');
      const [endHourProvider, endMinuteProvider] = hourProvider.end.split(':');
      const dateStart = new Date(
        YEAR_TO_COMPARE,
        MONTH_TO_COMPARE,
        DAY_TO_COMPARE,
        parseInt(startHourProvider, BASE_NUMBER),
        parseInt(startMinuteProvider, BASE_NUMBER),
        SECONDS_TO_COMPARE,
        MILLISECONDS_TO_COMPARE,
      );
      const dateEnd = new Date(
        YEAR_TO_COMPARE,
        MONTH_TO_COMPARE,
        DAY_TO_COMPARE,
        parseInt(endHourProvider, BASE_NUMBER),
        parseInt(endMinuteProvider, BASE_NUMBER),
        SECONDS_TO_COMPARE,
        MILLISECONDS_TO_COMPARE,
      );
      const dateCurrentList = new Date(
        YEAR_TO_COMPARE,
        MONTH_TO_COMPARE,
        DAY_TO_COMPARE,
        parseInt(hourSeparated, BASE_NUMBER),
        parseInt(minuteSeparated, BASE_NUMBER),
        SECONDS_TO_COMPARE,
        MILLISECONDS_TO_COMPARE,
      );
      if (
        dateCurrentList.getTime() >= dateStart.getTime() &&
        dateCurrentList.getTime() <= dateEnd.getTime()
      ) {
        return true;
      }

      return false;
    });
    if (isBetween) {
      return {
        id: index.toString(),
        hour,
        selected: true,
      };
    } else {
      return {
        id: index.toString(),
        hour,
        selected: false,
      };
    }
  });
}
