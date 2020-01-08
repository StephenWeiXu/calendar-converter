import React, { Component } from "react";
import { connect } from "react-redux";
import { setJulianDay, setTargetDate, calculateSourceCalendarDate} from "../reducers/calendarSlice";
import { ConverterUtil, calendarConversionToJulianDay } from "../utils/converterUtil";
import { DATE_TYPES } from "../utils/constantsUtil";


const converterUtil = new ConverterUtil();

const mapStateToProps = (state) => {
  return {
    calendar: state.calendar.targetCalendar,
    date: state.calendar.targetDate,
    year: state.calendar.targetDate.year,
    monthList: state.calendar.targetDate.monthList,
    monthIndex: state.calendar.targetDate.monthIndex,
    day: state.calendar.targetDate.day
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTargetDate: (payload) => {
      dispatch(setTargetDate({targetDate: payload}));
    },
    setJulianDay: (julianDayNumber) => {
      dispatch(setJulianDay({julianDay: julianDayNumber}));
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

  onDateChange(event, type) {
    let julianDay, modifiedDate;
    switch(type) {
      case DATE_TYPES.YEAR:
        modifiedDate = {year: Number(event.target.value), monthIndex: this.props.monthIndex, day: this.props.day};
        break;
      case DATE_TYPES.MONTH_INDEX:
        modifiedDate = {year: this.props.year, monthIndex: Number(event.target.value), day: this.props.day};
        break;
      case DATE_TYPES.DAY:
        modifiedDate = {year: this.props.year, monthIndex: this.props.monthIndex, day: Number(event.target.value)};
        break;
    }

    this.props.setTargetDate(modifiedDate);
    julianDay = calendarConversionToJulianDay(this.props.calendar, modifiedDate);
    this.props.setJulianDay(julianDay);
    this.props.calculateSourceCalendarDate();
  }

  getDisplayTargetYear() {
    return this.props.year === 0 ? "" : this.props.year;
  }

  getMonthList() {
    const monthList = this.props.monthList;
    return (
      <select onChange={(e) => this.onDateChange(e, DATE_TYPES.MONTH_INDEX)} value={this.props.monthIndex}>
        {monthList.map((month, index) => {
          return <option key={index} value={index}>{month}</option>;
        })}
      </select>
    )
  }

  getDisplayTargetDay() {
    return this.props.day === 0 ? "" : this.props.day;
  }

  render() {
    return (
      <div className="converter-body__calendar">
        <ul className="list-group list-group-horizontal calendar-group">
          <li className="list-group-item">
            <input
              type="text"
              name="sourceYear"
              placeholder="yyyy"
              value={this.getDisplayTargetYear()}
              onChange={(e) => this.onDateChange(e, DATE_TYPES.YEAR)}
            />
          </li>
          <li className="list-group-item">
            { this.getMonthList() }
          </li>
          <li className="list-group-item">
            <input
              type="text"
              name="sourceDay"
              placeholder="dd"
              value={this.getDisplayTargetDay()}
              onChange={(e) => this.onDateChange(e, DATE_TYPES.DAY)} 
            />
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetCalendar);