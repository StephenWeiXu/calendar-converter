import { createSlice } from "@reduxjs/toolkit";
import { CALENDAR_TYPES } from "../utils/constantsUtil";
import { calendarConversionFromJulianDay } from "../utils/converterUtil";


const calendarSlice = createSlice({
  name: "sourceCalendar",
  initialState: {
    screenSize: null,
    sourceCalendar: CALENDAR_TYPES.GREGORIAN,
    targetCalendar: CALENDAR_TYPES.LUNAR,
    reverseSourceTargetCalendarFlag: false,
    julianDay: 0,
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
    setScreenSize(state, action) {
      state.screenSize = action.payload.screenSize;
    },
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
    setJulianDay(state, action) {
      state.julianDay = action.payload.julianDay;
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
      const targetDate = calendarConversionFromJulianDay(state.targetCalendar, state.julianDay);

      state.targetDate.year = targetDate.year;
      state.targetDate.monthList = targetDate.monthList;
      state.targetDate.monthIndex = targetDate.monthIndex;
      state.targetDate.day = targetDate.day;
    },
    calculateSourceCalendarDate(state) {
      const sourceDate = calendarConversionFromJulianDay(state.sourceCalendar, state.julianDay);

      state.sourceDate.year = sourceDate.year;
      state.sourceDate.monthList = sourceDate.monthList;
      state.sourceDate.monthIndex = sourceDate.monthIndex;
      state.sourceDate.day = sourceDate.day;
    }
  }
});

export const {
  setScreenSize,
  setJulianDay,
  setSourceDate,
  setTargetDate,
  setSourceCalendar,
  setTargetCalendar,
  switchSourceAndTargetCalendar,
  calculateTargetCalendarDate,
  calculateSourceCalendarDate
}  = calendarSlice.actions;
export default calendarSlice.reducer;