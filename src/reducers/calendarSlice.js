import { createSlice } from "@reduxjs/toolkit";
import { SolarLunarConverter } from "../utils/converterUtil";
import { CALENDAR_TYPES } from "../utils/constantsUtil";

const solarLunarConverter = new SolarLunarConverter();

const calendarSlice = createSlice({
  name: "sourceCalendar",
  initialState: {
    sourceCalendar: CALENDAR_TYPES.SOLAR,
    targetCalendar: CALENDAR_TYPES.LUNAR,
    reverseSourceTargetCalendarFlag: false,
    sourceYear: 0,
    sourceMonth: 0,
    sourceDay: 0,
    targetYear: 0,
    targetMonth: 0,
    targetDay: 0
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

    setSourceYear(state, action) {
      state.sourceYear = Number(action.payload.sourceYear);
      calculateTargetCalendarDate(state, {});
    },
    setSourceMonth(state, action) {
      state.sourceMonth = Number(action.payload.sourceMonth);
      calculateTargetCalendarDate(state, {});
    },
    setSourceDay(state, action) {
      state.sourceDay = Number(action.payload.sourceDay);
      calculateTargetCalendarDate(state, {});
    },

    setTargetYear(state, action) {
      state.targetYear = Number(action.payload.targetYear);
    },
    setTargetMonth(state, action) {
      state.targetMonth = Number(action.payload.targetMonth);
    },
    setTargetDay(state, action) {
      state.targetDay = Number(action.payload.targetDay);
    },
    calculateTargetCalendarDate(state) {
      if (state.sourceCalendar === CALENDAR_TYPES.SOLAR && state.targetCalendar === CALENDAR_TYPES.LUNAR) {
        const targetCalendarDate = solarLunarConverter.solarToLunar(state.sourceYear, state.sourceMonth, state.sourceDay);
        console.log(targetCalendarDate);
        state.targetYear = targetCalendarDate.lunarYear;
        state.targetMonth = targetCalendarDate.lunarMonth;
        state.targetDay = targetCalendarDate.lunarDay;
      } else {
        console.error("unknown source calendar and target calendar");
      }
    }
  }
});

export const {
  setSourceCalendar,
  setTargetCalendar,
  switchSourceAndTargetCalendar,
  setSourceYear,
  setSourceMonth,
  setSourceDay,
  setTargetYear,
  setTargetMonth,
  setTargetDay,
  calculateTargetCalendarDate
}  = calendarSlice.actions;
export default calendarSlice.reducer;