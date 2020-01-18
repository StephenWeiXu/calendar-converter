import React, { Component } from "react";
import { connect } from "react-redux";
import { setJulianDay, setTargetDate, calculateSourceCalendarDate, setTargetErrorMessage} from "../reducers/calendarSlice";
import { CalendarWrapperHOC } from "./CalendarWrapper";


const mapStateToProps = (state) => {
  let year, monthIndex, day;
  const sourceErrorMessage = state.calendar.sourceErrorMessage;
  year = sourceErrorMessage ? "" : state.calendar.targetDate.year;
  monthIndex = sourceErrorMessage ? "-1" : state.calendar.targetDate.monthIndex;
  day = sourceErrorMessage ? "" : state.calendar.targetDate.day;

  return {
    calendar: state.calendar.targetCalendar,
    date: state.calendar.targetDate,
    year: year,
    monthList: state.calendar.targetDate.monthList,
    monthIndex: monthIndex,
    day: day,
    ownErrorMessage: state.calendar.targetErrorMessage,
    theOtherErrorMessage: state.calendar.sourceErrorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDate: (payload) => {
      dispatch(setTargetDate({targetDate: payload}));
    },
    setJulianDay: (julianDayNumber) => {
      dispatch(setJulianDay({julianDay: julianDayNumber}));
    },
    calculateTheOtherCalendarDate: () => {
      dispatch(calculateSourceCalendarDate());
    },
    setOwnErrorMessage: (message) => {
      dispatch(setTargetErrorMessage({errorMessage: message}));
    }
  };
};

class TargetCalendar extends Component {
  render() {
    return (
      <>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWrapperHOC(TargetCalendar));