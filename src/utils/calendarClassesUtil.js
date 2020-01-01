import {
  GREGORIAN_CALENDAR_MONTHS,
  LUNAR_CALENDAR_MONTHS,
  HEBREW_CALENDAR_MONTHS
} from "./constantsUtil";

export class BaseDate {
  constructor() {
    this.year = undefined;
    this.monthList = [];
    this.monthIndex = undefined;
    this.day = undefined;
  }
}

export class GregorianDate extends BaseDate {
  constructor() {
    super();
    this.monthList = GREGORIAN_CALENDAR_MONTHS;
  }
}

export class LunarDate extends BaseDate {
  constructor() {
    super();
    this.monthList = LUNAR_CALENDAR_MONTHS;
  }
}

export class HebrewDate extends BaseDate {
  constructor() {
    super();
    this.monthList = HEBREW_CALENDAR_MONTHS;
    this.hebrewMonthImg = undefined;
    this.leap = undefined;
  }
}
