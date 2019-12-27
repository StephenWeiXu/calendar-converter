import { createSlice } from "@reduxjs/toolkit";

export const CALENDAR_TYPES = {
  SOLAR: "solar",
  LUNAR: "lunar"
}

const converterSlice = createSlice({
  name: "converter",
  initialState: {
    sourceCalendar: CALENDAR_TYPES.SOLAR,
    targetCalendar: CALENDAR_TYPES.LUNAR
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
    }
  }
});

export const {setSourceCalendar, setTargetCalendar, switchSourceAndTargetCalendar} = converterSlice.actions;
export default converterSlice.reducer;