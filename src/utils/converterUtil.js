import {Solar, Lunar, LunarSolarConverter} from "../lib/LunarSolarConverter";
import * as calendarConverterLib from "../lib/calendarConverterLib";
import {GregorianDate, LunarDate, HebrewDate, IslamicDate, JulianDate, PersianDate, IndianCivilDate} from "./calendarClassesUtil";
import { CALENDAR_TYPES } from "./constantsUtil";


export class ConverterUtil {
  constructor() {
    this.gregorianDate = new GregorianDate();
    this.hebrewDate = new HebrewDate();
    this.islamicDate = new IslamicDate();
    this.julianDate = new JulianDate();
    this.persianDate = new PersianDate();
    this.indianCivilDate = new IndianCivilDate();
  }

  gregorianToJulianDay(gregorianDate) {
    let min = 0, hour = 0, sec = 0;
    
    let julianDay = calendarConverterLib.gregorian_to_jd(
      gregorianDate.year,
      gregorianDate.monthIndex + 1,
      gregorianDate.day
    ) + (Math.floor(sec + 60 * (min + 60 * hour) + 0.5) / 86400.0);

    return julianDay;
  }

  julianDayToGregorian(julianDay) {
    let date = calendarConverterLib.jd_to_gregorian(julianDay);
    this.gregorianDate.year = date[0];
    this.gregorianDate.monthIndex = date[1] - 1;
    this.gregorianDate.day = date[2];
    return this.gregorianDate;
  }

  hebrewToJulianDay(hebrewDate) {    
    let julianDay = calendarConverterLib.hebrew_to_jd(
      hebrewDate.year,
      hebrewDate.monthIndex + 1,
      hebrewDate.day
    );

    return julianDay;
  }

  julianDayToHebrew(julianDay) {
    calendarConverterLib.julianDayToHebrewConverter(julianDay, this.hebrewDate);
    return this.hebrewDate;
  }

  islamicToJulianDay(islamicDate) {
    let julianDay = calendarConverterLib.islamic_to_jd(
      islamicDate.year,
      islamicDate.monthIndex + 1,
      islamicDate.day
    );

    return julianDay;
  }

  julianDayToIslamic(julianDay) {
    calendarConverterLib.julianDayToIslamicConverter(julianDay, this.islamicDate);
    return this.islamicDate;
  }

  julianDayToLunar(julianDay) {
    let gregorianDate = this.julianDayToGregorian(julianDay);

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

  lunarToJulianDay(lunarDate) {
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

    let julianDay = this.gregorianToJulianDay(gregorianDate);
    return julianDay;
  }

  julianDayToJulianDate(julianDay) {
    let date = calendarConverterLib.jd_to_julian(julianDay);
    this.julianDate.year = date[0];
    this.julianDate.monthIndex = date[1] - 1;
    this.julianDate.day = date[2];
    return this.julianDate;
  }

  julianDateToJulianDay(julianDate) {
    let julianDay = calendarConverterLib.julian_to_jd(
      julianDate.year,
      julianDate.monthIndex + 1,
      julianDate.day
    );

    return julianDay;
  }

  julianDayToPersian(julianDay) {
    let date = calendarConverterLib.jd_to_persian(julianDay);
    this.persianDate.year = date[0];
    this.persianDate.monthIndex = date[1] - 1;
    this.persianDate.day = date[2];
    return this.persianDate;
  }

  persianToJulianDay(persianDate) {
    let julianDay = calendarConverterLib.persian_to_jd(
      persianDate.year,
      persianDate.monthIndex + 1,
      persianDate.day
    );

    return julianDay;
  }

  julianDayToIndianCivil(julianDay) {
    let date = calendarConverterLib.jd_to_indian_civil(julianDay);
    this.indianCivilDate.year = date[0];
    this.indianCivilDate.monthIndex = date[1] - 1;
    this.indianCivilDate.day = date[2];
    return this.indianCivilDate;
  }

  indianCivilToJulianDay(indianCivilDate) {
    let julianDay = calendarConverterLib.indian_civil_to_jd(
      indianCivilDate.year,
      indianCivilDate.monthIndex + 1,
      indianCivilDate.day
    );

    return julianDay;
  }
}


const converterUtil = new ConverterUtil();

export function calendarConversionFromJulianDay(calendarType, julianDay) {
  switch(calendarType) {
    case CALENDAR_TYPES.GREGORIAN:
      return converterUtil.julianDayToGregorian(julianDay);
    case CALENDAR_TYPES.LUNAR:
      return converterUtil.julianDayToLunar(julianDay);    
    case CALENDAR_TYPES.HEBREW:
      return converterUtil.julianDayToHebrew(julianDay);
    case CALENDAR_TYPES.ISLAMIC:
      return converterUtil.julianDayToIslamic(julianDay);
    case CALENDAR_TYPES.JULIAN:
      return converterUtil.julianDayToJulianDate(julianDay);
    case CALENDAR_TYPES.PERSIAN:
      return converterUtil.julianDayToPersian(julianDay);
    case CALENDAR_TYPES.INDIANCIVIL:
      return converterUtil.julianDayToIndianCivil(julianDay);
    default:
      return {};
  }
}

export function calendarConversionToJulianDay(calendarType, inputDate) {
  switch(calendarType) {
    case CALENDAR_TYPES.GREGORIAN:
      return converterUtil.gregorianToJulianDay(inputDate);
    case CALENDAR_TYPES.LUNAR:
      return converterUtil.lunarToJulianDay(inputDate);
    case CALENDAR_TYPES.HEBREW:
      return converterUtil.hebrewToJulianDay(inputDate);
    case CALENDAR_TYPES.ISLAMIC:
      return converterUtil.islamicToJulianDay(inputDate);
    case CALENDAR_TYPES.JULIAN:
      return converterUtil.julianDateToJulianDay(inputDate);
    case CALENDAR_TYPES.PERSIAN:
      return converterUtil.persianToJulianDay(inputDate);
    case CALENDAR_TYPES.INDIANCIVIL:
      return converterUtil.indianCivilToJulianDay(inputDate);
    default:
      return {};
  }
}
