import {Solar, Lunar, LunarSolarConverter} from "../lib/LunarSolarConverter";

export class SolarLunarConverter {
  constructor() {
    this.solar = new Solar();
    this.lunar = new Lunar();
    this.converter = new LunarSolarConverter();
  }

  solarToLunar(year, month, day) {
    this.solar.solarYear = year;
    this.solar.solarMonth = month;
    this.solar.solarDay = day;
    let lunar = this.converter.SolarToLunar(this.solar);
    return lunar;
  }
}
