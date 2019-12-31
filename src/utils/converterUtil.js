import {Solar, Lunar, LunarSolarConverter} from "../lib/LunarSolarConverter";
import * as calendarConverterLib from "../lib/calendarConverterLib";


class Hebrew {
  constructor() {
    this.year = undefined;
    this.month = {
      options: []
    };
    this.day = undefined;
    this.hebmonth = undefined;
    this.leap = undefined;
  }
}

export class ConverterUtil {
  constructor() {
  }

  solarToLunar(year, month, day) {
    let solar = new Solar();
    let lunar = new Lunar();
    let converter = new LunarSolarConverter();

    solar.solarYear = year;
    solar.solarMonth = month;
    solar.solarDay = day;
    lunar = converter.SolarToLunar(solar);
    return lunar;
  }

  lunarToSolar(year, month, day) {
    let solar = new Solar();
    let lunar = new Lunar();
    let converter = new LunarSolarConverter();

    lunar.lunarYear = year;
    lunar.lunarMonth = month;
    lunar.lunarDay = day;
    solar = converter.LunarToSolar(lunar);
    return solar;
  }

  gregorianToHebrew(year, month, day) {
    let julianDay = calendarConverterLib.gregorian_to_jd(year, month + 1, day);
    // + (Math.floor(sec + 60 * (min + 60 * hour) + 0.5) / 86400.0);

    hebcal = calendarConverterLib.jd_to_hebrew(j);
    if (hebrew_leap(hebcal[0])) {
      document.hebrew.month.options.length = 13;
      document.hebrew.month.options[11] = new Option("Adar I");
      document.hebrew.month.options[12] = new Option("Veadar");
    } else {
      document.hebrew.month.options.length = 12;
      document.hebrew.month.options[11] = new Option("Adar");
    }
    document.hebrew.year.value = hebcal[0];
    document.hebrew.month.selectedIndex = hebcal[1] - 1;
    document.hebrew.day.value = hebcal[2];
    hmindex = hebcal[1];
    if (hmindex == 12 && !hebrew_leap(hebcal[0])) {
      hmindex = 14;
    }
    document.hebrew.hebmonth.src = "figures/hebrew_month_" +
      hmindex + ".gif";
    switch (hebrew_year_days(hebcal[0])) {
    case 353:
      document.hebrew.leap.value = "Common deficient (353 days)";
      break;

    case 354:
      document.hebrew.leap.value = "Common regular (354 days)";
      break;

    case 355:
      document.hebrew.leap.value = "Common complete (355 days)";
      break;

    case 383:
      document.hebrew.leap.value = "Embolismic deficient (383 days)";
      break;

    case 384:
      document.hebrew.leap.value = "Embolismic regular (384 days)";
      break;

    case 385:
      document.hebrew.leap.value = "Embolismic complete (385 days)";
      break;

    default:
      document.hebrew.leap.value = "Invalid year length: " +
        hebrew_year_days(hebcal[0]) + " days.";
      break;
    }


  }
}
