import React, { Component } from "react";
import { connect } from "react-redux";
import { setJulianDay, setSourceDate, calculateTargetCalendarDate, setSourceErrorMessage } from "../reducers/calendarSlice";
import { CalendarWrapperHOC } from "./CalendarWrapper";


const mapStateToProps = (state) => {
  let year, monthIndex, day;
  const targetErrorMessage = state.calendar.targetErrorMessage;
  year = targetErrorMessage ? "" : state.calendar.sourceDate.year;
  monthIndex = targetErrorMessage ? "-1" : state.calendar.sourceDate.monthIndex;
  day = targetErrorMessage ? "" : state.calendar.sourceDate.day;

  return {
    calendar: state.calendar.sourceCalendar,
    date: state.calendar.sourceDate,
    year: year,
    monthList: state.calendar.sourceDate.monthList,
    monthIndex: monthIndex,
    day: day,
    ownErrorMessage: state.calendar.sourceErrorMessage,
    theOtherErrorMessage: state.calendar.targetErrorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDate: (payload) => {
      dispatch(setSourceDate({sourceDate: payload}));
    },
    setJulianDay: (julianDayNumber) => {
      dispatch(setJulianDay({julianDay: julianDayNumber}));
    },
    calculateTheOtherCalendarDate: () => {
      dispatch(calculateTargetCalendarDate());
    },
    setOwnErrorMessage: (message) => {
      dispatch(setSourceErrorMessage({errorMessage: message}));
    }
  };
};


class SourceCalendar extends Component {
  render() {
    return (
      <>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWrapperHOC(SourceCalendar));