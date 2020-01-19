import { createSlice } from "@reduxjs/toolkit";


const calendarDataSlice = createSlice({
  name: "calendarData",
  initialState: {
    calendarDataCollection: {},
    currentCalendarName: ""
  },
  reducers: {
    setCalendarDataCollection(state, action) {
      let calendarName = action.payload.calendarName;
      let calendarData = action.payload.calendarData;
      state.calendarDataCollection[calendarName] = calendarData;
    },
    setCurrentCalendarName(state, action) {
      state.currentCalendarName = action.payload.currentCalendarName;
    }
  }
});

export const {
  setCalendarDataCollection,
  setCurrentCalendarName
}  = calendarDataSlice.actions;
export default calendarDataSlice.reducer;