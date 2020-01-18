import { combineReducers } from "redux";
import calendarSlice from "./calendarSlice";
import utilsSlice from "./utilsSlice";

export default combineReducers({
  calendar: calendarSlice,
  utils: utilsSlice
})