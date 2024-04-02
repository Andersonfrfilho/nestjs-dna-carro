import { HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD } from '../modules/user/provider/user.provider.constant';

function sortedArrayPeriodByAsc(hours: HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD[]) {
  return hours.sort((elementA, elementB) => {
    const elementAHour = parseInt(elementA.split(':')[0]);
    const elementAMinute = parseInt(elementA.split(':')[1]);
    const elementBHour = parseInt(elementB.split(':')[0]);
    const elementBMinute = parseInt(elementB.split(':')[1]);
    const elementADate = new Date(
      2021,
      0,
      1,
      elementAHour,
      elementAMinute,
    ).getTime();
    const elementBDate = new Date(
      2021,
      0,
      1,
      elementBHour,
      elementBMinute,
    ).getTime();
    return elementADate - elementBDate;
  });
}

export function reducePeriodsByIntervalsBetween(
  hours: HOURS_DAY_PER_FIFTEEN_MINUTE_PERIOD[],
) {
  const orderTimeByAsc = sortedArrayPeriodByAsc(hours);

  const getIntervalInHoursAvailable: {
    start?: string;
    end?: string;
  }[] = [];

  let indexHours = 0;

  do {
    let start;
    if (!getIntervalInHoursAvailable[indexHours]?.start) {
      start = orderTimeByAsc.shift();
    } else {
      start = getIntervalInHoursAvailable[indexHours].start;
    }

    const end = orderTimeByAsc.shift();
    if (!start || !end) {
      break;
    }
    const startHour = parseInt(start.split(':')[0]);
    const startMinute = parseInt(start.split(':')[1]);
    const endHour = parseInt(end.split(':')[0]);
    const endMinute = parseInt(end.split(':')[1]);
    const startDate = new Date(2021, 0, 1, startHour, startMinute).getTime();
    const endDate = new Date(2021, 0, 1, endHour, endMinute).getTime();
    const interval = endDate - startDate;

    if (!getIntervalInHoursAvailable[indexHours]?.start) {
      getIntervalInHoursAvailable[indexHours] = {
        start: start,
      };
    }

    if (
      getIntervalInHoursAvailable[indexHours]?.start &&
      interval > 1000 * 60 * 15
    ) {
      getIntervalInHoursAvailable[indexHours] = {
        ...getIntervalInHoursAvailable[indexHours],
        end: end,
      };
      indexHours++;
    }
  } while (orderTimeByAsc.length > 0);

  return getIntervalInHoursAvailable;
}
