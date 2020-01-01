import React, { Component } from "react";
import { connect } from "react-redux";
import { GREGORIAN_CALENDAR_MONTHS } from "../utils/constantsUtil";
import { setSourceDate, calculateTargetCalendarDate } from "../reducers/calendarSlice";


const mapStateToProps = (state) => {
  return {
    sourceDate: state.calendar.sourceDate,
    sourceYear: state.calendar.sourceYear,
    sourceMonth: state.calendar.sourceMonth,
    sourceDay: state.calendar.sourceDay
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSourceDate: (payload) => {
      dispatch(setSourceDate({sourceDate: payload}));
    },
    calculateTargetCalendarDate: () => {
      dispatch(calculateTargetCalendarDate());
    }
  };
};

class SourceCalendar extends Component {
  constructor(props) {
    super(props);
  }

  getMonthList() {
    const monthList = this.props.sourceDate.monthList;
    return (
      <select onChange={(e) => this.onSourceMonthChange(e)}>
        {monthList.map((month, index) => {
          const isSelected = this.props.sourceDate.monthIndex === index;
          return <option key={index} value={month} selected={isSelected}>{monthList[index]}</option>;
        })}
      </select>
    )
  }

  onSourceYearChange(event) {
    this.props.setSourceDate({year: event.target.value});
    this.props.calculateTargetCalendarDate();
  }

  onSourceMonthChange(event) {
    this.props.setSourceDate({monthIndex: event.target.value});
    this.props.calculateTargetCalendarDate();
  }

  onSourceDayChange(event) {
    this.props.setSourceDate({day: event.target.value});
    this.props.calculateTargetCalendarDate();
  }

  getDisplaySourceYear() {
    return this.props.sourceDate.year === 0 ? "" : this.props.sourceDate.year;
  }

  getDisplaySourceDay() {
    return this.props.sourceDate.day === 0 ? "" : this.props.sourceDate.day;
  }

  render() {
    return (
      <>
      <ul className="list-group list-group-horizontal calendar-group">
        <li className="list-group-item">
          <input type="text" name="sourceYear" placeholder="yyyy" value={this.getDisplaySourceYear()} onChange={(e) => this.onSourceYearChange(e)} />
        </li>
        <li className="list-group-item">
          { this.getMonthList() }
        </li>
        <li className="list-group-item">
          <input type="text" name="sourceDay" placeholder="dd" value={this.getDisplaySourceDay()} onChange={(e) => this.onSourceDayChange(e)} />
        </li>
      </ul>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceCalendar);