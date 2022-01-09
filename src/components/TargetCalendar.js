import React, { Component, useState, useEffect, useContext } from "react";
import { calendarConversionToJulianDay, calendarConversionFromJulianDay } from "../utils/converterUtil";
import { DATE_TYPES, CALENDAR_TYPES } from "../utils/constantsUtil";
import { ConverterCardContext } from "./ConverterCard";


export default function TargetCalendar() {
  const { julianDay, setJulianDay, sourceCalendar, setSourceCalendar, targetCalendar, setTargetCalendar,sourceErrorMessage, setSourceErrorMessage,
    targetErrorMessage, setTargetErrorMessage, reverseSourceTargetCalendarFlag, setReverseSourceTargetCalendarFlag,
    sourceDate, setSourceDate, targetDate, setTargetDate } = useContext(ConverterCardContext);

  const [year, setYear] = useState(targetDate.year);
  const [monthIndex, setMonthIndex] = useState(targetDate.monthIndex);
  const [monthList, setMonthList] = useState(targetDate.monthList);
  const [day, setDay] = useState(targetDate.day);

  useEffect(() => {
    setYear(sourceErrorMessage ? "" : targetDate.year);
    setMonthIndex(sourceErrorMessage ? "-1" : targetDate.monthIndex);
    setMonthList(sourceErrorMessage ? [] : targetDate.monthList);
    setDay(sourceErrorMessage ? "" : targetDate.day);
  }, [targetDate, sourceErrorMessage]);

    
  function onDateChange(event, type) {
    let julianDay, modifiedDate, targetValue;

    targetValue = Number(event.target.value);
    switch(type) {
      case DATE_TYPES.YEAR:
        modifiedDate = {year: targetValue, monthList: monthList, monthIndex: monthIndex, day: day};
        validateYear(targetValue);
        break;
      case DATE_TYPES.MONTH_INDEX:
        modifiedDate = {year: year, monthList: monthList, monthIndex: targetValue, day: day};
        break;
      case DATE_TYPES.DAY:
        modifiedDate = {year: year, monthList: monthList, monthIndex: monthIndex, day: targetValue};
        validateDay(targetValue);
        break;
    }

    setTargetDate(modifiedDate);
    julianDay = calendarConversionToJulianDay(targetCalendar, modifiedDate);
    setJulianDay(julianDay);
    setSourceDate(calendarConversionFromJulianDay(sourceCalendar, julianDay));
  }

  function validateYear(year) {
    if (isNaN(year) || year < 1) {
      setTargetErrorMessage("Invalid Year Value. Year value should be bigger than 0");
    } else {
      setTargetErrorMessage("");
    }
  }

  function validateDay(day) {
    if (isNaN(day) || day < 1 || day >= 31) {
      setTargetErrorMessage("Invalid Day Value. Day should be within 1 - 31");
    } else {
      setTargetErrorMessage("");
    }
  }

  function getDisplayYear(year) {
    return year === 0 || isNaN(year) ? "" : year;
  }

  function getMonthList(monthList, monthIndex) {
    return (
      <select onChange={(e) => onDateChange(e, DATE_TYPES.MONTH_INDEX)} value={monthIndex}>
        {monthList.map((month, index) => {
          return <option key={index} value={index}>{month}</option>;
        })}
      </select>
    )
  }

  function getDisplayDay(day) {
    return day === 0 || isNaN(day) ? "" : day;
  }

  return (
    <>
    <div className="converter-body__calendar">
      <ul className="list-group list-group-horizontal calendar-group">
        <li className="list-group-item">
          <input
            type="text"
            name="year"
            placeholder="YYYY"
            value={getDisplayYear(year)}
            onChange={(e) => onDateChange(e, DATE_TYPES.YEAR)}
          />
        </li>
        <li className="list-group-item">
          { getMonthList(monthList, monthIndex) }
        </li>
        <li className="list-group-item">
          <input
            type="text"
            name="day"
            placeholder="DD"
            value={getDisplayDay(day)}
            onChange={(e) => onDateChange(e, DATE_TYPES.DAY)}
          />
        </li>
      </ul>
      <p className="error-message">{targetErrorMessage && `*${targetErrorMessage}`}</p>
    </div>
    </>
  )
}
