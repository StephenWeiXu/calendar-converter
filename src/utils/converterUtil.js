import {Solar, Lunar, LunarSolarConverter} from "../lib/LunarSolarConverter";
import {gregorianToHebrewConverter} from "../lib/calendarConverterLib";
import {GregorianDate, LunarDate, HebrewDate} from "./calendarClassesUtil";

export class ConverterUtil {
 
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

  gregorianToHebrew(gregorianDate) {
    let hebrewDate = new HebrewDate();
    gregorianToHebrewConverter(gregorianDate, hebrewDate);
    return hebrewDate;
  }
}
