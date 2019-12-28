import { combineReducers } from "redux";
import converterSlice from "./converterSlice";
import calendarSlice from "./calendarSlice";

export default combineReducers({
  converter: converterSlice,
  calendar: calendarSlice
})