import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import { CALENDAR_NAME_WITH_WIKI_TERM } from "../utils/constantsUtil";
import { Helmet } from "react-helmet";
import NavBar from "../components/NavBar";
import GregorianCalendar from "../calendars/GregorianCalendar";
import LunarCalendar from "../calendars/LunarCalendar";
import HebrewCalendar from "../calendars/HebrewCalendar";
import IslamicCalendar from "../calendars/IslamicCalendar";
import JulianCalendar from "../calendars/JulianCalendar";
import PersianCalendar from "../calendars/PersianCalendar";
import IndianNationalCalendar from "../calendars/IndianNationalCalendar";


const CALENDAR_NAME_TO_COMPONENT_NAME = {
  "Gregorian Calendar": GregorianCalendar,
  "Lunar Calendar": LunarCalendar,
  "Hebrew Calendar": HebrewCalendar,
  "Islamic Calendar": IslamicCalendar,
  "Julian Calendar": JulianCalendar,
  "Persian Calendar": PersianCalendar,
  "Indian National Calendar": IndianNationalCalendar
}

const CalendarDetail = function Template(props) {
  let calendarName = props.pageContext.calendarName;

  const [currentCalendarName, setCurrentCalendarName] = useState("");

  useEffect(() => {
    setCurrentCalendarName(calendarName);
  }, []);

  function getCalendarDetailsHtml() {
    let CalendarComponent = CALENDAR_NAME_TO_COMPONENT_NAME[currentCalendarName];
    if (CalendarComponent) {
      return <CalendarComponent />;
    }
  }

  return (
    <div>
      <Helmet>
        <title>{currentCalendarName} - Calendar Converter</title>
        <meta name="description" content={`Learn more about ${currentCalendarName}, and use the calendar converter to convert a calendar date to/from ${currentCalendarName}`} />
      </Helmet>
  
      <NavBar />

      <Container className="content">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>{currentCalendarName}</h1>
            <p><a href="/">Try the calendar converter</a></p>
            {getCalendarDetailsHtml()}
            <p className="mts">
              Source: <a target="_blank" href={`https://en.wikipedia.org/wiki/${CALENDAR_NAME_WITH_WIKI_TERM[currentCalendarName]}`}>Wikipedia</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CalendarDetail;
