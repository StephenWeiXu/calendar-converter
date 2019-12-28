import { createSlice } from "@reduxjs/toolkit";


const calendarSlice = createSlice({
  name: "sourceCalendar",
  initialState: {
    sourceYear: 0,
    sourceMonth: 0,
    sourceDay: 0,
    targetYear: 0,
    targetMonth: 0,
    targetDay: 0
  },
  reducers: {
    setSourceYear(state, action) {
      state.sourceYear = action.payload.sourceYear;
    },
    setSourceMonth(state, action) {
      state.sourceMonth = action.payload.sourceMonth;
    },
    setSourceDay(state, action) {
      state.sourceDay = action.payload.sourceDay;
    },
    setTargetYear(state, action) {
      state.targetYear = action.payload.targetYear;
    },
    setTargetMonth(state, action) {
      state.targetMonth = action.payload.targetMonth;
    },
    setTargetDay(state, action) {
      state.targetDay = action.payload.targetDay;
    },
  }
});

export const { setSourceYear, setSourceMonth, setSourceDay, setTargetYear, setTargetMonth, setTargetDay}  = calendarSlice.actions;
export default calendarSlice.reducer;