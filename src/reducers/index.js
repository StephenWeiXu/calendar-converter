import { combineReducers } from "redux";
import calendarSlice from "./calendarSlice";
import utilsSlice from "./utilsSlice";
import calendarDataSlice from "./calendarDataSlice";

export default combineReducers({
  calendar: calendarSlice,
  utils: utilsSlice,
  calendarData: calendarDataSlice
})