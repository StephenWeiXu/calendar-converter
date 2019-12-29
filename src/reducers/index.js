import { combineReducers } from "redux";
import calendarSlice from "./calendarSlice";

export default combineReducers({
  calendar: calendarSlice
})