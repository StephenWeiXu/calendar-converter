import React, { Component } from "react";
import { connect } from "react-redux";
import { GREGORIAN_CALENDAR_MONTHS } from "../utils/constantsUtil";
import { setTargetDate, calculateSourceCalendarDate} from "../reducers/calendarSlice";

const mapStateToProps = (state) => {
  return {
    targetDate: state.calendar.targetDate,
    targetYear: state.calendar.targetYear,
    targetMonth: state.calendar.targetMonth,
    targetDay: state.calendar.targetDay
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTargetDate: (payload) => {
      dispatch(setTargetDate({targetDate: payload}));
    },
    calculateSourceCalendarDate: () => {
      dispatch(calculateSourceCalendarDate());
    }
  };
};

class TargetCalendar extends Component {
  constructor(props) {
    super(props);
  }

  onTargetYearChange(event) {
    this.props.setTargetDate({year: event.target.value});
    this.props.calculateSourceCalendarDate();
  }

  onTargetMonthChange(event) {
    this.props.setTargetDate({monthIndex: event.target.value});
    this.props.calculateSourceCalendarDate();
  }

  onTargetDayChange(event) {
    this.props.setTargetDate({day: event.target.value});
    this.props.calculateSourceCalendarDate();
  }

  getTargetMonthList() {
    const monthList = this.props.targetDate.monthList;
    return (
      <select onChange={(e) => this.onTargetMonthChange(e)}>
        {monthList.map((month, index) => {
          const isSelected = this.props.targetDate.monthIndex === index;
          return <option key={index} value={index} selected={isSelected}>{monthList[index]}</option>;
        })}
      </select>
    )
  }

  getDisplayTargetYear() {
    return this.props.targetDate.year === 0 ? "" : this.props.targetDate.year;
  }

  getDisplayTargetDay() {
    return this.props.targetDate.day === 0 ? "" : this.props.targetDate.day;
  }

  render() {
    return (
      <>
      <ul className="list-group list-group-horizontal calendar-group">
        <li className="list-group-item">
          <input type="text" name="sourceYear" placeholder="yyyy" value={this.getDisplayTargetYear()} onChange={(e) => this.onTargetYearChange(e)} />
        </li>
        <li className="list-group-item">
          { this.getTargetMonthList() }
        </li>
        <li className="list-group-item">
          <input type="text" name="sourceDay" placeholder="dd" value={this.getDisplayTargetDay()} onChange={(e) => this.onTargetDayChange(e)} />
        </li>
      </ul>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetCalendar);