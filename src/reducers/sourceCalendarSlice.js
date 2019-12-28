import { createSlice } from "@reduxjs/toolkit";


const sourceCalendarSlice = createSlice({
  name: "sourceCalendar",
  initialState: {
    year: 0,
    month: 0,
    day: 0
  },
  reducers: {
    setYear(state, action) {
      state.year = action.payload.year;
    },
    setMonth(state, action) {
      state.month = action.payload.month;
    },
    setDay(state, action) {
      state.day = action.payload.day;
    }
  }
});

export const { setYear, setMonth, setDay}  = sourceCalendarSlice.actions;
export default sourceCalendarSlice.reducer;