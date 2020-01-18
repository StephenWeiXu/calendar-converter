import { createSlice } from "@reduxjs/toolkit";


const utilsSlice = createSlice({
  name: "sourceCalendar",
  initialState: {
    screenSize: null,
  },
  reducers: {
    setScreenSize(state, action) {
      state.screenSize = action.payload.screenSize;
    }
  }
});

export const {
  setScreenSize
}  = utilsSlice.actions;
export default utilsSlice.reducer;