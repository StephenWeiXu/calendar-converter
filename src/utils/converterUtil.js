import {Solar, Lunar, LunarSolarConverter} from "../lib/LunarSolarConverter";
import * as calendarConverterLib from "../lib/calendarConverterLib";

export class BaseDate {
  constructor() {
    this.year = undefined;
    this.month = undefined;
    this.day = undefined;
  }
}

export class GregorianDate extends BaseDate {}

export class LunarDate extends BaseDate {}

export class HebrewDate {
  constructor() {
    this.year = undefined;
    this.month = [
      "Nisan",
      "Iyyar",
      "Sivan",
      "Tammuz",
      "Av",
      "Elul",
      "Tishri",
      "Heshvan",
      "Kislev",
      "Teveth",
      "Shevat",
      "Adar",
      "Veadar"
    ];
    this.selectedMonthIndex = undefined;
    this.day = undefined;
    this.hebrewMonthImg = undefined;
    this.leap = undefined;
  }
}

export class ConverterUtil {
  constructor() {
  }

  solarToLunar(solarDate) {
    let lunarDate = new LunarDate();
    let solar = new Solar();
    let lunar = new Lunar();
    let converter = new LunarSolarConverter();

    solar.solarYear = solarDate.year;
    solar.solarMonth = solarDate.month;
    solar.solarDay = solarDate.day;
    lunar = converter.SolarToLunar(solar);

    lunarDate.year = lunar.lunarYear;
    lunarDate.month = lunar.lunarMonth;
    lunarDate.day = lunar.lunarDay;
    return lunarDate;
  }

  lunarToSolar(lunarDate) {
    let gregorianDate = new GregorianDate();
    let solar = new Solar();
    let lunar = new Lunar();
    let converter = new LunarSolarConverter();

    lunar.lunarYear = lunarDate.year;
    lunar.lunarMonth = lunarDate.month;
    lunar.lunarDay = lunarDate.day;
    solar = converter.LunarToSolar(lunar);

    gregorianDate.year = solar.solarYear;
    gregorianDate.month = solar.solarMonth;
    gregorianDate.day = solar.solarDay;
    return gregorianDate;
  }

  gregorianToHebrew(year, month, day) {
    let hebrewDate = new HebrewDate();
    
    let julianDay = calendarConverterLib.gregorian_to_jd(year, month + 1, day);
    // + (Math.floor(sec + 60 * (min + 60 * hour) + 0.5) / 86400.0);

    hebcal = calendarConverterLib.jd_to_hebrew(julianDay);
    if (hebrew_leap(hebcal[0])) {
      hebrewDate.month.length = 13;
      hebrewDate.month[11] = "Adar I";
      hebrewDate.month[12] = "Veadar";
    } else {
      hebrewDate.month.length = 12;
      hebrewDate.month[11] = "Adar";
    }
    hebrewDate.year = hebcal[0];
    hebrewDate.selectedMonthIndex = hebcal[1] - 1;
    hebrewDate.day = hebcal[2];
    hmindex = hebcal[1];
    if (hmindex == 12 && !hebrew_leap(hebcal[0])) {
      hmindex = 14;
    }
    hebrewDate.hebrewMonthImg = "figures/hebrew_month_" +
      hmindex + ".gif";
    switch (hebrew_year_days(hebcal[0])) {
      case 353:
        hebrewDate.leap = "Common deficient (353 days)";
        break;

      case 354:
        hebrewDate.leap = "Common regular (354 days)";
        break;

      case 355:
        hebrewDate.leap = "Common complete (355 days)";
        break;

      case 383:
        hebrewDate.leap = "Embolismic deficient (383 days)";
        break;

      case 384:
        hebrewDate.leap = "Embolismic regular (384 days)";
        break;

      case 385:
        hebrewDate.leap = "Embolismic complete (385 days)";
        break;

      default:
        hebrewDate.leap = "Invalid year length: " +
          hebrew_year_days(hebcal[0]) + " days.";
        break;
    }
  }
}
