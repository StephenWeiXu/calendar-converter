import {Solar, Lunar, LunarSolarConverter} from "../lib/LunarSolarConverter";
import {
  jd_to_gregorian,
  gregorian_to_jd,
  hebrew_to_jd,
  julianDayToHebrewConverter,
  islamic_to_jd,
  julianDayToIslamicConverter,
} from "../lib/calendarConverterLib";
import {GregorianDate, LunarDate, HebrewDate, IslamicDate} from "./calendarClassesUtil";
import { CALENDAR_TYPES } from "./constantsUtil";


export class ConverterUtil {
  constructor() {
    this.gregorianDate = new GregorianDate();
    this.hebrewDate = new HebrewDate();
    this.islamicDate = new IslamicDate();
  }

  gregorianToJulianDay(inputDate) {
    let min = 0, hour = 0, sec = 0;
    
    let julianDay = gregorian_to_jd(
      inputDate.year,
      inputDate.monthIndex + 1,
      inputDate.day
    ) + (Math.floor(sec + 60 * (min + 60 * hour) + 0.5) / 86400.0);

    return julianDay;
  }

  julianDayToGregorian(julianDay) {
    let date = jd_to_gregorian(julianDay);
    this.gregorianDate.year = date[0];
    this.gregorianDate.monthIndex = date[1] - 1;
    this.gregorianDate.day = date[2];
    return this.gregorianDate;
  }

  hebrewToJulianDay(inputDate) {    
    let julianDay = hebrew_to_jd(
      inputDate.year,
      inputDate.monthIndex + 1,
      inputDate.day
    );

    return julianDay;
  }

  julianDayToHebrew(julianDay) {
    julianDayToHebrewConverter(julianDay, this.hebrewDate);
    return this.hebrewDate;
  }

  islamicToJulianDay(inputDate) {
    let julianDay = islamic_to_jd(
      inputDate.year,
      inputDate.monthIndex + 1,
      inputDate.day
    );

    return julianDay;
  }

  julianDayToIslamic(julianDay) {
    julianDayToIslamicConverter(julianDay, this.islamicDate);
    return this.islamicDate;
  }
 
  gregorianToLunar(gregorianDate) {
    let lunarDate = new LunarDate();
    let solar = new Solar();
    let lunar = new Lunar();
    let converter = new LunarSolarConverter();

    solar.solarYear = gregorianDate.year;
    solar.solarMonth = gregorianDate.monthIndex + 1;
    solar.solarDay = gregorianDate.day;
    lunar = converter.SolarToLunar(solar);

    lunarDate.year = lunar.lunarYear;
    lunarDate.monthIndex = lunar.lunarMonth - 1;
    lunarDate.day = lunar.lunarDay;
    return lunarDate;
  }

  lunarToGregorian(lunarDate) {
    let gregorianDate = new GregorianDate();
    let solar = new Solar();
    let lunar = new Lunar();
    let converter = new LunarSolarConverter();

    lunar.lunarYear = lunarDate.year;
    lunar.lunarMonth = lunarDate.monthIndex + 1;
    lunar.lunarDay = lunarDate.day;
    solar = converter.LunarToSolar(lunar);

    gregorianDate.year = solar.solarYear;
    gregorianDate.monthIndex = solar.solarMonth - 1;
    gregorianDate.day = solar.solarDay;
    return gregorianDate;
  }
}


const converterUtil = new ConverterUtil();

export function calendarConversionFromJulianDay(calendarType, julianDay) {
  switch(calendarType) {
    case CALENDAR_TYPES.GREGORIAN:
      return converterUtil.julianDayToGregorian(julianDay);
    case CALENDAR_TYPES.HEBREW:
      return converterUtil.julianDayToHebrew(julianDay);
    case CALENDAR_TYPES.ISLAMIC:
      return converterUtil.julianDayToIslamic(julianDay)
    default:
      return {};
  }
}

export function calendarConversionToJulianDay(calendarType, inputDate) {
  switch(calendarType) {
    case CALENDAR_TYPES.GREGORIAN:
      return converterUtil.gregorianToJulianDay(inputDate);
    case CALENDAR_TYPES.HEBREW:
      return converterUtil.hebrewToJulianDay(inputDate);
    case CALENDAR_TYPES.ISLAMIC:
      return converterUtil.islamicToJulianDay(inputDate);
    default:
      return {};
  }
}
