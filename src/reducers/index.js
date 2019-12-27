import { combineReducers } from "redux";
import ConverterReducer from "./ConverterSlice";

export default combineReducers({
  converter: ConverterReducer
})