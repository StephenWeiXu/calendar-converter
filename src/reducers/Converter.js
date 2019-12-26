import { createSlice } from "@reduxjs/toolkit";

const CALENDAR_TYPES = {
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
    setSourceCalendar(state, action) {},
    setTargetCalendar(state, action) {}
  }
});

const { actions, reducers } = converterSlice;
export const {setSourceCalendar, setTargetCalendar} = actions;
export default reducers;