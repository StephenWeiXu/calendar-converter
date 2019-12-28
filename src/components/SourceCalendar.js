import React, { Component } from "react";
import { GREGORIAN_CALENDAR_MONTHS } from "../utils/constantsUtil";

class SourceCalendar extends Component {
  constructor(props) {
    super(props);
  }

  getMonthList() {
    return (
      <select>
        {Object.keys(GREGORIAN_CALENDAR_MONTHS).map( (monthKey) => {
          return <option key={monthKey} value={monthKey}>{GREGORIAN_CALENDAR_MONTHS[monthKey]}</option>;
        })}
      </select>
    )
  }

  render() {
    return (
      <>
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item">
          <input type="text" name="sourceYear" placeholder="YYYY" />
        </li>
        <li className="list-group-item">
          { this.getMonthList() }
        </li>
        <li className="list-group-item">
          <input type="text" name="sourceDay" placeholder="DD" />
        </li>
      </ul>
      </>
    )
  }
}

export default SourceCalendar;