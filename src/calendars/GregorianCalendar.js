import React, { Component } from "react";


class GregorianCalendar extends Component {
  render() {
    return (
      <div>
        <p>The Gregorian calendar is the calendar used in most of the world. It is named after Pope Gregory XIII, who introduced it in October 1582.</p>
        <p>The calendar spaces leap years to make the average year 365.2425 days long, approximating the 365.2422-day tropical year that is determined by the Earth's revolution around the Sun. The rule for leap years is:</p>
        <p>Every year that is exactly divisible by four is a leap year, except for years that are exactly divisible by 100, but these centurial years are leap years if they are exactly divisible by 400. For example, the years 1700, 1800, and 1900 are not leap years, but the years 1600 and 2000 are.</p>
        <p>The calendar was developed as a correction to the Julian calendar, shortening the average year by 0.0075 days to stop the drift of the calendar with respect to the equinoxes. To deal with the 10 days' difference (between calendar and reality) that this drift had already reached, the date was advanced so that 4 October 1582 was followed by 15 October 1582. There was no discontinuity in the cycle of weekdays or of the Anno Domini calendar era. The reform also altered the lunar cycle used by the Church to calculate the date for Easter (computus), restoring it to the time of the year as originally celebrated by the early Church.</p>
        <p>The reform was adopted initially by the Catholic countries of Europe and their overseas possessions. Over the next three centuries, the Protestant and Eastern Orthodox countries also moved to what they called the Improved calendar, with Greece being the last European country to adopt the calendar in 1923. To unambiguously specify a date during the transition period, (or in history texts), dual dating is sometimes used to specify both Old Style and New Style dates (abbreviated as O.S and N.S. respectively). Due to globalization in the 20th century, the calendar has also been adopted by most non-Western countries for civil purposes. The calendar era carries the alternative secular name of "Common Era".</p>
      </div>
    )
  }
}

export default GregorianCalendar;