import React, { Component, useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import { CALENDAR_NAME_WITH_WIKI_TERM } from "../utils/constantsUtil";
import { Helmet } from "react-helmet";
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

export default function CalendarDetails(props) {
  const [currentCalendarName, setCurrentCalendarName] = useState("");

  useEffect(() => {
    setCurrentCalendarName(props.calendarName);
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
        <title>{props.calendarName} - Calendar Converter</title>
        <meta name="description" content={`Learn more about ${props.calendarName}, and use the calendar converter to convert a calendar date to/from ${props.calendarName}`} />
      </Helmet>
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>{props.calendarName}</h1>
            <p><Link to="/">Try the calendar converter</Link></p>
            {this.getCalendarDetailsHtml()}
            <p className="mts">
              Source: <a target="_blank" href={`https://en.wikipedia.org/wiki/${CALENDAR_NAME_WITH_WIKI_TERM[props.calendarName]}`}>Wikipedia</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
