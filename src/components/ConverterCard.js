import React, { useEffect, useState, useReducer, createContext } from "react";
import { Container, Row, Col, Card, Dropdown, ButtonGroup} from "react-bootstrap";
import { CALENDAR_TYPES } from "../utils/constantsUtil";
import SourceCalendar from "./SourceCalendar";
import TargetCalendar from "./TargetCalendar";
import { ConverterUtil , calendarConversionFromJulianDay} from "../utils/converterUtil";
import { MediaQueryUtil } from "../utils/displayUtil";

const isBrowser = () => typeof window !== "undefined";
const mediaQueryUtil = new MediaQueryUtil();

/**
 * Get the display title of the calendar
 * @param {String} calendar 
 */
function getCalendarDisplayTitle(calendar) {
  return `${calendar}`;
}

function getResponsiveVisibileCount() {
  if (!isBrowser()) {
    return 0;
  }
  
  if (mediaQueryUtil.isSmallScreen(window.innerWidth) || mediaQueryUtil.isXSmallScreen(window.innerWidth)) {
    return 0;
  } else if (mediaQueryUtil.isMediumScreen(window.innerWidth)) {
    return 1;
  } else if (mediaQueryUtil.isLargeScreen(window.innerWidth)) {
    return 2;
  }
  return 3;
}

// compute today's JulianDay
const today = new Date();
const converterUtil = new ConverterUtil();
let todayJulianDay = converterUtil.gregorianToJulianDay({
  year: today.getFullYear(),
  monthIndex: today.getMonth(),
  day: today.getDate()
});
export const ConverterCardContext = createContext();

function reducer(originalState, newState) {
  return newState;
}

export default function CalendarCard(props) {
  const [screenSize, setScreenSize] = useState(null);
  const [sourceCalendar, setSourceCalendar] = useReducer(reducer, CALENDAR_TYPES.GREGORIAN);
  const [targetCalendar, setTargetCalendar] = useReducer(reducer, CALENDAR_TYPES.LUNAR);
  const [sourceErrorMessage, setSourceErrorMessage] = useState("");
  const [targetErrorMessage, setTargetErrorMessage] = useState("");
  const [reverseSourceTargetCalendarFlag, setReverseSourceTargetCalendarFlag] = useState(false);
  const [julianDay, setJulianDay] = useState(todayJulianDay);
  const [sourceDate, setSourceDate] = useState({
    year: 0,
    monthList: [],
    monthIndex: 0,
    day: 0
  });
  const [targetDate, setTargetDate] = useState({
    year: 0,
    monthList: [],
    monthIndex: 0,
    day: 0
  });

  // Listen on sourceCalendar state for updates
  useEffect(() => {
    setSourceDate(calendarConversionFromJulianDay(sourceCalendar, julianDay));
  }, [sourceCalendar]);

  // Listen on targetCalendar state for updates
  useEffect(() => {
    setTargetDate(calendarConversionFromJulianDay(targetCalendar, julianDay));
  }, [targetCalendar]);

  function switchSourceAndTargetCalendar() {
    let tempSource = sourceCalendar;
    setSourceCalendar(targetCalendar);
    setTargetCalendar(tempSource);
    setReverseSourceTargetCalendarFlag(!reverseSourceTargetCalendarFlag);
  }

  /**
   * Change calendar in the calendar dropdown
   * @param {Event} event
   * @param {Boolean} isSource
   */
  function changeCalendar(event, isSource) {
    const calendarName = event.target.dataset.calendarName;
    if (isSource) {
      setSourceCalendar(calendarName);
    } else {
      setTargetCalendar(calendarName);
    }
  }

  /**
   * Render the calendar title dropdown button
   * @param {String} currentCalendar
   * @param {Boolean} isSource 
   */
  function renderCalendarTitleDropdown(currentCalendar, isSource) {
    let visibileCount = getResponsiveVisibileCount();
    let visibleCalendars = [];
    let hiddenCalendars = [];

    Object.keys(CALENDAR_TYPES).map((calendarKey) => {
      let calendarName = CALENDAR_TYPES[calendarKey];

      // Remove the same calendar in the other card to avoid redundancy;
      // if (isSource && calendarName === targetCalendar) {
      //   return;
      // }
      // if (!isSource && calendarName === sourceCalendar) {
      //   return;
      // }

      // Get visiable calendar names to show and hidden calendar names to hide in dropdown
      if (calendarName !== currentCalendar) {
        if (visibleCalendars.length < visibileCount) {
          visibleCalendars.push(calendarKey);
        } else {
          hiddenCalendars.push(calendarKey);
        }
      }
    })

    return (
      <Dropdown as={ButtonGroup}>
        <Dropdown.Item href="#" className="calendar-item selected">
          {getCalendarDisplayTitle(currentCalendar)}
        </Dropdown.Item>

        {
          visibleCalendars.map((calendarKey, index) => {
            let calendarName = CALENDAR_TYPES[calendarKey];
            if (calendarName !== currentCalendar) {
              return (
                <Dropdown.Item href="#" key={index} data-calendar-name={calendarName} className="calendar-item" onClick={(e) => changeCalendar(e, isSource)}>
                  {getCalendarDisplayTitle(calendarName)}
                </Dropdown.Item>
              )
            }
          })
        }

        <Dropdown.Toggle split className="converter-header__dropdown-button" />
        <Dropdown.Menu>
          {
            hiddenCalendars.map((calendarKey, index) => {
              let calendarName = CALENDAR_TYPES[calendarKey];
              if (calendarName !== currentCalendar) {
                return (
                  <Dropdown.Item href="#" className="converter-header__dropdown-item" key={index} data-calendar-name={calendarName} onClick={(e) => changeCalendar(e, isSource)}>
                    {getCalendarDisplayTitle(calendarName)}
                  </Dropdown.Item>
                )
              }
            })
          }
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  let contextToPass = { julianDay, setJulianDay, sourceCalendar, setSourceCalendar, targetCalendar, setTargetCalendar,sourceErrorMessage, setSourceErrorMessage,
    targetErrorMessage, setTargetErrorMessage, reverseSourceTargetCalendarFlag, setReverseSourceTargetCalendarFlag,
    sourceDate, setSourceDate, targetDate, setTargetDate };

  return (
    <ConverterCardContext.Provider value={contextToPass}>
      <Card className="converter-card">
        <Card.Header className="converter-header">
        <Container>
          <Row>
            <Col xs={5}>
              {renderCalendarTitleDropdown(sourceCalendar, true)}
            </Col>
            <Col xs={2}>
              {/* <img src="images/switch.png" className="converter-header__switch-icon" onClick={switchSourceAndTargetCalendar} /> */}
            </Col>
            <Col xs={5}>
              {renderCalendarTitleDropdown(targetCalendar, false)}
            </Col>
          </Row>
          </Container>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col className="converter-body__source" md={6}>
                {reverseSourceTargetCalendarFlag ? <TargetCalendar /> : <SourceCalendar />}
              </Col>
              <Col className="converter-body__target" md={6}>
                {reverseSourceTargetCalendarFlag ? <SourceCalendar /> : <TargetCalendar />}
              </Col>
            </Row>
            </Container>
        </Card.Body>
      </Card>
    </ConverterCardContext.Provider>
  );
}
