import React, { Component } from "react";
import { connect } from "react-redux";
import { GREGORIAN_CALENDAR_MONTHS } from "../utils/constantsUtil";


const mapStateToProps = (state) => {
  return {
    targetYear: state.calendar.targetYear,
    targetMonth: state.calendar.targetMonth,
    targetDay: state.calendar.targetDay
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class TargetCalendar extends Component {
  constructor(props) {
    super(props);
  }

  getMonthList() {
    return (
      <select>
        {Object.keys(GREGORIAN_CALENDAR_MONTHS).map( (monthKey) => {
          const isSelected = this.props.targetMonth === Number(monthKey);
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
          <input type="text" name="sourceYear" placeholder="yyyy" value={this.props.targetYear} />
        </li>
        <li className="list-group-item">
          { this.getMonthList() }
        </li>
        <li className="list-group-item">
          <input type="text" name="sourceDay" placeholder="dd" value={this.props.targetDay} />
        </li>
      </ul>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetCalendar);