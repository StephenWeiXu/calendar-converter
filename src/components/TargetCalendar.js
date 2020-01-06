import React, { Component } from "react";
import { connect } from "react-redux";
import { setJulianDay, setTargetDate, calculateSourceCalendarDate} from "../reducers/calendarSlice";
import { ConverterUtil } from "../utils/converterUtil";
import { DATE_TYPES } from "../utils/constantsUtil";


const converterUtil = new ConverterUtil();

const mapStateToProps = (state) => {
  return {
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
    let julianDay;
    switch(type) {
      case DATE_TYPES.YEAR:
        this.props.setTargetDate({year: event.target.value});
        julianDay = converterUtil.gregorianToJulianDay(Number(event.target.value), this.props.monthIndex, this.props.day);
        break;
      case DATE_TYPES.MONTH_INDEX:
        this.props.setTargetDate({monthIndex: event.target.value});
        julianDay = converterUtil.gregorianToJulianDay(this.props.year, Number(event.target.value), this.props.day);
        break;
      case DATE_TYPES.DAY:
        this.props.setTargetDate({day: event.target.value});
        julianDay = converterUtil.gregorianToJulianDay(this.props.year, this.props.monthIndex, Number(event.target.value));
        break;
    }
    this.props.setJulianDay(julianDay);
    this.props.calculateSourceCalendarDate();
  }

  getDisplayTargetYear() {
    return this.props.year === 0 ? "" : this.props.year;
  }

  getMonthList() {
    const monthList = this.props.monthList;
    return (
      <select onChange={(e) => this.onDateChange(e, DATE_TYPES.MONTH_INDEX)}>
        {monthList.map((month, index) => {
          const isSelected = this.props.monthIndex === index;
          return <option key={index} value={index} selected={isSelected}>{month}</option>;
        })}
      </select>
    )
  }

  getDisplayTargetDay() {
    return this.props.day === 0 ? "" : this.props.day;
  }

  render() {
    return (
      <>
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
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetCalendar);