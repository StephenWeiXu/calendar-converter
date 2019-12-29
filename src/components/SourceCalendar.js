import React, { Component } from "react";
import { connect } from "react-redux";
import { GREGORIAN_CALENDAR_MONTHS } from "../utils/constantsUtil";
import { setSourceYear, setSourceMonth, setSourceDay, calculateTargetCalendarDate } from "../reducers/calendarSlice";


const mapStateToProps = (state) => {
  return {
    sourceYear: state.calendar.sourceYear,
    sourceMonth: state.calendar.sourceMonth,
    sourceDay: state.calendar.sourceDay
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSourceYear: (year) => {
      dispatch(setSourceYear({sourceYear: year}));
    },
    setSourceMonth: (month) => {
      dispatch(setSourceMonth({sourceMonth: month}));
    },
    setSourceDay: (day) => {
      dispatch(setSourceDay({sourceDay: day}));
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

  componentDidMount() {
    const today = new Date();
    this.props.setSourceYear(today.getFullYear());
    this.props.setSourceMonth(today.getMonth() + 1);
    this.props.setSourceDay(today.getDate());

    this.props.calculateTargetCalendarDate();
  }

  getMonthList() {
    return (
      <select>
        {Object.keys(GREGORIAN_CALENDAR_MONTHS).map( (monthKey) => {
          const isSelected = this.props.sourceMonth === Number(monthKey);
          return <option key={monthKey} value={monthKey} selected={isSelected}>{GREGORIAN_CALENDAR_MONTHS[monthKey]}</option>;
        })}
      </select>
    )
  }

  render() {
    return (
      <>
      <ul className="list-group list-group-horizontal calendar-group">
        <li className="list-group-item">
          <input type="text" name="sourceYear" placeholder="yyyy" value={this.props.sourceYear} />
        </li>
        <li className="list-group-item">
          { this.getMonthList() }
        </li>
        <li className="list-group-item">
          <input type="text" name="sourceDay" placeholder="dd" value={this.props.sourceDay} />
        </li>
      </ul>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceCalendar);