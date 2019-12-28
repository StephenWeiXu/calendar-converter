import { combineReducers } from "redux";
import ConverterSlice from "./converterSlice";
import SourceCalendarSlice from "./sourceCalendarSlice";

export default combineReducers({
  converter: ConverterSlice,
  sourceCalendar: SourceCalendarSlice
})