import { createSlice } from "@reduxjs/toolkit";
import { ConverterUtil } from "../utils/converterUtil";
import { CALENDAR_TYPES } from "../utils/constantsUtil";

const converterUtil = new ConverterUtil();

const calendarSlice = createSlice({
  name: "sourceCalendar",
  initialState: {
    sourceCalendar: CALENDAR_TYPES.GREGORIAN,
    targetCalendar: CALENDAR_TYPES.HEBREW,
    reverseSourceTargetCalendarFlag: false,
    sourceDate: {
      year: 0,
      monthList: [],
      monthIndex: 0,
      day: 0
    },
    targetDate: {
      year: 0,
      monthList: [],
      monthIndex: 0,
      day: 0
    }
  },
  reducers: {
    setSourceCalendar(state, action) {
      state.sourceCalendar = action.payload.sourceCalendar;
    },
    setTargetCalendar(state, action) {
      state.targetCalendar = action.payload.targetCalendar;
    },
    switchSourceAndTargetCalendar(state) {
      let tempSource = state.sourceCalendar;
      state.sourceCalendar = state.targetCalendar;
      state.targetCalendar = tempSource;
      
      state.reverseSourceTargetCalendarFlag = !state.reverseSourceTargetCalendarFlag;
    },
    setSourceDate(state, action) {
      const sourceDate = action.payload.sourceDate;
      state.sourceDate.year = sourceDate.hasOwnProperty("year") ? Number(sourceDate.year) : state.sourceDate.year;
      state.sourceDate.monthList = sourceDate.hasOwnProperty("monthList") ? sourceDate.monthList : state.sourceDate.monthList;
      state.sourceDate.monthIndex = sourceDate.hasOwnProperty("monthIndex") ? Number(sourceDate.monthIndex) : state.sourceDate.monthIndex;
      state.sourceDate.day = sourceDate.hasOwnProperty("day") ? Number(sourceDate.day) : state.sourceDate.day;
    },
    setTargetDate(state, action) {
      const targetDate = action.payload.targetDate;
      state.targetDate.year = targetDate.hasOwnProperty("year") ? Number(targetDate.year) : state.targetDate.year;
      state.targetDate.monthList = targetDate.hasOwnProperty("monthList") ? targetDate.monthList : state.targetDate.monthList;
      state.targetDate.monthIndex = targetDate.hasOwnProperty("monthIndex") ? Number(targetDate.monthIndex) : state.targetDate.monthIndex;
      state.targetDate.day = targetDate.hasOwnProperty("day") ? Number(targetDate.day) : state.targetDate.day;
    },
    calculateTargetCalendarDate(state) {
      let targetDate;
      if (state.sourceCalendar === CALENDAR_TYPES.GREGORIAN && state.targetCalendar === CALENDAR_TYPES.LUNAR) {
        targetDate = converterUtil.gregorianToLunar(state.sourceDate);
        console.log(targetDate);
      } else if (state.sourceCalendar === CALENDAR_TYPES.GREGORIAN && state.targetCalendar === CALENDAR_TYPES.HEBREW) {
        targetDate = converterUtil.gregorianToHebrew(state.sourceDate);
      } else {
        console.error("unknown source calendar and target calendar");
      }

      state.targetDate.year = targetDate.year;
      state.targetDate.monthList = targetDate.monthList;
      state.targetDate.monthIndex = targetDate.monthIndex;
      state.targetDate.day = targetDate.day;
    },
    calculateSourceCalendarDate(state) {
      if (state.sourceCalendar === CALENDAR_TYPES.GREGORIAN && state.targetCalendar === CALENDAR_TYPES.LUNAR) {
        console.log(state.targetDate);
        const sourceDate = converterUtil.lunarToGregorian(state.targetDate);
        console.log(sourceDate);
        state.sourceDate.year = sourceDate.year;
        state.sourceDate.monthIndex = sourceDate.monthList;
        state.sourceDate.monthIndex = sourceDate.monthIndex;
        state.sourceDate.day = sourceDate.day;
      } else {
        console.error("unknown source calendar and target calendar");
      }
    }
  }
});

export const {
  setSourceDate,
  setTargetDate,
  setSourceCalendar,
  setTargetCalendar,
  switchSourceAndTargetCalendar,
  calculateTargetCalendarDate,
  calculateSourceCalendarDate
}  = calendarSlice.actions;
export default calendarSlice.reducer;