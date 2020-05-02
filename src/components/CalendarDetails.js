import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import { setCurrentCalendarName } from "../reducers/calendarDataSlice";
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

const mapStateToProps = (state) => {
  let currentCalendarName = state.calendarData.currentCalendarName;
  return {
    currentCalendarName: currentCalendarName
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentCalendarName: (calendarName) => {
      dispatch(setCurrentCalendarName({currentCalendarName: calendarName}));
    }
  };
}

class CalendarDetails extends Component {
  componentDidMount() {
    this.props.setCurrentCalendarName(this.props.calendarName);
  }

  getCalendarDetailsHtml() {
    let CalendarComponent = CALENDAR_NAME_TO_COMPONENT_NAME[this.props.currentCalendarName];
    if (CalendarComponent) {
      return <CalendarComponent />;
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{this.props.calendarName} - Calendar Converter</title>
          <meta name="description" content={`Learn more about ${this.props.calendarName}, and use the calendar converter to convert a calendar date to/from ${this.props.calendarName}`} />
        </Helmet>
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h1>{this.props.calendarName}</h1>
              <p><Link to="/">Try the calendar converter</Link></p>
              {this.getCalendarDetailsHtml()}
              <p className="mts">
                Source: <a target="_blank" href={`https://en.wikipedia.org/wiki/${CALENDAR_NAME_WITH_WIKI_TERM[this.props.calendarName]}`}>Wikipedia</a>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDetails);