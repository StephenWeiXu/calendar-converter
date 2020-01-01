import { createSlice } from "@reduxjs/toolkit";
import { ConverterUtil } from "../utils/converterUtil";
import { CALENDAR_TYPES } from "../utils/constantsUtil";

const converterUtil = new ConverterUtil();

const calendarSlice = createSlice({
  name: "sourceCalendar",
  initialState: {
    sourceCalendar: CALENDAR_TYPES.SOLAR,
    targetCalendar: CALENDAR_TYPES.LUNAR,
    reverseSourceTargetCalendarFlag: false,
    sourceDate: {
      year: 0,
      month: 0,
      day: 0
    },
    targetDate: {
      year: 0,
      month: 0,
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
      state.sourceDate.month = sourceDate.hasOwnProperty("month") ? Number(sourceDate.month) : state.sourceDate.month;
      state.sourceDate.day = sourceDate.hasOwnProperty("day") ? Number(sourceDate.day) : state.sourceDate.day;
    },
    setTargetDate(state, action) {
      const targetDate = action.payload.targetDate;
      state.targetDate.year = targetDate.hasOwnProperty("year") ? Number(targetDate.year) : state.targetDate.year;
      state.targetDate.month = targetDate.hasOwnProperty("month") ? Number(targetDate.month) : state.targetDate.month;
      state.targetDate.day = targetDate.hasOwnProperty("day") ? Number(targetDate.day) : state.targetDate.day;
    },
    calculateTargetCalendarDate(state) {
      if (state.sourceCalendar === CALENDAR_TYPES.SOLAR && state.targetCalendar === CALENDAR_TYPES.LUNAR) {
        // console.log(state.sourceDate);
        const targetDate = converterUtil.solarToLunar(state.sourceDate);
        console.log(targetDate);
        state.targetDate.year = targetDate.year;
        state.targetDate.month = targetDate.month;
        state.targetDate.day = targetDate.day;
      } else {
        console.error("unknown source calendar and target calendar");
      }
    },
    calculateSourceCalendarDate(state) {
      if (state.sourceCalendar === CALENDAR_TYPES.SOLAR && state.targetCalendar === CALENDAR_TYPES.LUNAR) {
        console.log(state.targetDate);
        const sourceDate = converterUtil.lunarToSolar(state.targetDate);
        console.log(sourceDate);
        state.sourceDate.year = sourceDate.year;
        state.sourceDate.month = sourceDate.month;
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