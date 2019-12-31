import { LUNAR_MONTH_DAYS, SOLAR_MONTH_DAYS} from "./lunarSolarDataTable";

export class Lunar {
    constructor() {
        this.isleap = false;
        this.lunarDay = 0;
        this.lunarMonth = 0;
        this.lunarYear = 0;
    }
}

export class Solar {
    constructor() {
        this.solarDay = 0;
        this.solarMonth = 0;
        this.solarYear = 0;
    }
}

export class LunarSolarConverter {
    /*
     * |----4位闰月|-------------13位1为30天，0为29天|
     */

    constructor() {
        this.lunar_month_days = LUNAR_MONTH_DAYS;

        this.solar_1_1 = SOLAR_MONTH_DAYS;
    }

    /**
     * @return {number}
     */
    GetBitInt(data, length, shift) {
        return (data & (((1 << length) - 1) << shift)) >> shift;
    };

    // WARNING: Dates before Oct. 1582 are inaccurate
    /**
     * @return {number}
     */
    SolarToInt(y, m, d) {
        m = (m + 9) % 12;
        y = parseInt(y) - parseInt(m / 10);
        return 365 * y + parseInt(y / 4) - parseInt(y / 100) + parseInt(y / 400) + parseInt((m * 306 + 5) / 10)
            + (d - 1);
    };

    SolarFromInt(g) {
        var y = parseInt((10000 * g + 14780) / 3652425);
        var ddd = g - (365 * y + parseInt(y / 4) - parseInt(y / 100) + parseInt(y / 400));
        if (ddd < 0) {
            y--;
            ddd = g - (365 * y + parseInt(y / 4) - parseInt(y / 100) + parseInt(y / 400));
        }
        var mi = parseInt((100 * ddd + 52) / 3060);
        var mm = (mi + 2) % 12 + 1;
        y = y + parseInt((mi + 2) / 12);
        var dd = ddd - parseInt((mi * 306 + 5) / 10) + 1;
        var solar = new Solar();
        solar.solarYear = parseInt(y);
        solar.solarMonth = parseInt(mm);
        solar.solarDay = parseInt(dd);
        return solar;
    };

    LunarToSolar(lunar) {
        var days = this.lunar_month_days[lunar.lunarYear - this.lunar_month_days[0]];
        var leap = this.GetBitInt(days, 4, 13);
        var offset = 0;
        var loopend = leap;
        if (!lunar.isleap) {
            if (lunar.lunarMonth <= leap || leap == 0) {
                loopend = lunar.lunarMonth - 1;
            } else {
                loopend = lunar.lunarMonth;
            }
        }
        for (var i = 0; i < loopend; i++) {
            offset += this.GetBitInt(days, 1, 12 - i) == 1 ? 30 : 29;
        }
        offset += lunar.lunarDay;

        var solar11 = this.solar_1_1[lunar.lunarYear - this.solar_1_1[0]];

        var y = this.GetBitInt(solar11, 12, 9);
        var m = this.GetBitInt(solar11, 4, 5);
        var d = this.GetBitInt(solar11, 5, 0);

        return this.SolarFromInt(this.SolarToInt(y, m, d) + offset - 1);
    };

    SolarToLunar(solar) {
        var lunar = new Lunar();
        var index = solar.solarYear - this.solar_1_1[0];
        var data = (solar.solarYear << 9) | (solar.solarMonth << 5)
            | (solar.solarDay);
        if (this.solar_1_1[index] > data) {
            index--;
        }
        var solar11 = this.solar_1_1[index];
        var y = this.GetBitInt(solar11, 12, 9);
        var m = this.GetBitInt(solar11, 4, 5);
        var d = this.GetBitInt(solar11, 5, 0);
        var offset = this.SolarToInt(solar.solarYear, solar.solarMonth,
                solar.solarDay) - this.SolarToInt(y, m, d);

        var days = this.lunar_month_days[index];
        var leap = this.GetBitInt(days, 4, 13);

        var lunarY = index + this.solar_1_1[0];
        var lunarM = 1;
        offset += 1;

        for (var i = 0; i < 13; i++) {
            var dm = this.GetBitInt(days, 1, 12 - i) == 1 ? 30 : 29;
            if (offset > dm) {
                lunarM++;
                offset -= dm;
            } else {
                break;
            }
        }
        var lunarD = parseInt(offset);
        lunar.lunarYear = lunarY;
        lunar.lunarMonth = lunarM;
        lunar.isleap = false;
        if (leap != 0 && lunarM > leap) {
            lunar.lunarMonth = lunarM - 1;
            if (lunarM == leap + 1) {
                lunar.isleap = true;
            }
        }

        lunar.lunarDay = lunarD;
        return lunar;
    }
}
