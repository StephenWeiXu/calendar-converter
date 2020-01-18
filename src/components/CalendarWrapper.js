import React, { Component } from "react";
import { calendarConversionToJulianDay } from "../utils/converterUtil";
import { DATE_TYPES } from "../utils/constantsUtil";


export function CalendarWrapperHOC(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    onDateChange(event, type) {
      let julianDay, modifiedDate, targetValue;

      targetValue = Number(event.target.value);
      switch(type) {
        case DATE_TYPES.YEAR:
          modifiedDate = {year: targetValue, monthIndex: this.props.monthIndex, day: this.props.day};
          this.validateYear(targetValue);
          break;
        case DATE_TYPES.MONTH_INDEX:
          modifiedDate = {year: this.props.year, monthIndex: targetValue, day: this.props.day};
          break;
        case DATE_TYPES.DAY:
          modifiedDate = {year: this.props.year, monthIndex: this.props.monthIndex, day: targetValue};
          this.validateDay(targetValue);
          break;
      }

      this.props.setDate(modifiedDate);
      julianDay = calendarConversionToJulianDay(this.props.calendar, modifiedDate);
      this.props.setJulianDay(julianDay);
      this.props.calculateTheOtherCalendarDate();
    }

    validateYear(year) {
      if (year < 1) {
        this.props.setOwnErrorMessage("Invalid Year Value. Year value should be bigger than 0");
      } else {
        this.props.setOwnErrorMessage("");
      }
    }

    validateDay(day) {
      if (day < 1 || day >= 31) {
        this.props.setOwnErrorMessage("Invalid Day Value. Day should be within 1 - 31");
      } else {
        this.props.setOwnErrorMessage("");
      }
    }

    getDisplayYear() {
      return this.props.year === 0 ? "" : this.props.year;
    }

    getMonthList() {
      const monthList = this.props.monthList;
      return (
        <select onChange={(e) => this.onDateChange(e, DATE_TYPES.MONTH_INDEX)} value={this.props.monthIndex}>
          <option value="-1">---</option>
          {monthList.map((month, index) => {
            return <option key={index} value={index}>{month}</option>;
          })}
        </select>
      )
    }

    getDisplayDay() {
      return this.props.day === 0 ? "" : this.props.day;
    }

    render() {
      return (
        <>
        <div className="converter-body__calendar">
          <ul className="list-group list-group-horizontal calendar-group">
            <li className="list-group-item">
              <input
                type="text"
                name="year"
                placeholder="YYYY"
                value={this.getDisplayYear()}
                onChange={(e) => this.onDateChange(e, DATE_TYPES.YEAR)}
              />
            </li>
            <li className="list-group-item">
              { this.getMonthList() }
            </li>
            <li className="list-group-item">
              <input
                type="text"
                name="day"
                placeholder="DD"
                value={this.getDisplayDay()}
                onChange={(e) => this.onDateChange(e, DATE_TYPES.DAY)}
              />
            </li>
          </ul>
          <p className="error-message">{this.props.ownErrorMessage && `*${this.props.ownErrorMessage}`}</p>
        </div>
        <WrappedComponent {...this.props} />
        </>
      )
    }
  };
}
