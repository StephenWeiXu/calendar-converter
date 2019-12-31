import React, { Component } from "react";
import { connect } from "react-redux";
import { GREGORIAN_CALENDAR_MONTHS } from "../utils/constantsUtil";
import { setTargetYear, setTargetMonth, setTargetDay, calculateSourceCalendarDate} from "../reducers/calendarSlice";

const mapStateToProps = (state) => {
  return {
    targetYear: state.calendar.targetYear,
    targetMonth: state.calendar.targetMonth,
    targetDay: state.calendar.targetDay
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTargetYear: (year) => {
      dispatch(setTargetYear({targetYear: year}));
    },
    setTargetMonth: (month) => {
      dispatch(setTargetMonth({targetMonth: month}));
    },
    setTargetDay: (day) => {
      dispatch(setTargetDay({targetDay: day}));
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
    this.props.setTargetYear(event.target.value);
    this.props.calculateSourceCalendarDate();
  }

  onTargetMonthChange(event) {
    this.props.setTargetMonth(event.target.value);
    this.props.calculateSourceCalendarDate();
  }

  onTargetDayChange(event) {
    this.props.setTargetDay(event.target.value);
    this.props.calculateSourceCalendarDate();
  }

  getTargetMonthList() {
    return (
      <select onChange={(e) => this.onTargetMonthChange(e)}>
        {Object.keys(GREGORIAN_CALENDAR_MONTHS).map((monthKey) => {
          const isSelected = this.props.targetMonth === Number(monthKey);
          return <option key={monthKey} value={monthKey} selected={isSelected}>{GREGORIAN_CALENDAR_MONTHS[monthKey]}</option>;
        })}
      </select>
    )
  }

  getDisplayTargetYear() {
    return this.props.targetYear === 0 ? "" : this.props.targetYear;
  }

  getDisplayTargetDay() {
    return this.props.targetDay === 0 ? "" : this.props.targetDay;
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