import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Card, Dropdown, ButtonGroup} from "react-bootstrap";
import { CALENDAR_TYPES } from "../utils/constantsUtil";
import SourceCalendar from "./SourceCalendar";
import TargetCalendar from "./TargetCalendar";
import {
  setSourceCalendar,
  setTargetCalendar,
  switchSourceAndTargetCalendar,
  setSourceDate,
  setTargetDate,
  setJulianDay,
  calculateSourceCalendarDate,
  calculateTargetCalendarDate 
} from "../reducers/calendarSlice";
import { ConverterUtil } from "../utils/converterUtil";


const mapStateToProps = (state) => {
  return {
    sourceCalendar: state.calendar.sourceCalendar,
    targetCalendar: state.calendar.targetCalendar,
    reverseSourceTargetCalendarFlag: state.calendar.reverseSourceTargetCalendarFlag
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSourceCalendar: (calendar) => {
      dispatch(setSourceCalendar({sourceCalendar: calendar}));
    },
    setTargetCalendar: (calendar) => {
      dispatch(setTargetCalendar({targetCalendar: calendar}));
    },
    switchSourceAndTargetCalendar: () => {
      dispatch(switchSourceAndTargetCalendar());
    },
    setJulianDay: (julianDayNumber) => {
      dispatch(setJulianDay({julianDay: julianDayNumber}));
    },
    setSourceDate: () => {
      dispatch(setSourceDate());
    },
    setTargetDate: () => {
      dispatch(setTargetDate());
    },
    calculateSourceCalendarDate: () => {
      dispatch(calculateSourceCalendarDate());
    },
    calculateTargetCalendarDate: () => {
      dispatch(calculateTargetCalendarDate());
    }
  };
}

class CalendarCard extends Component {
	constructor(props) {
		super(props);
  }

  componentDidMount() {
    // Initialize source calendar with today's date
    const today = new Date();
    const converterUtil = new ConverterUtil();
    let julianDay = converterUtil.gregorianToJulianDay({
      year: today.getFullYear(),
      monthIndex: today.getMonth(),
      day: today.getDate()
    });
    this.props.setJulianDay(julianDay);
    this.props.calculateSourceCalendarDate();
    this.props.calculateTargetCalendarDate();
  }

  /**
   * Change calendar in the calendar dropdown
   * @param {Event} event
   * @param {Boolean} isSource
   */
  changeCalendar(event, isSource) {
    const calendarName = event.target.dataset.calendarName;
    if (isSource) {
      this.props.setSourceCalendar(calendarName);
      this.props.calculateSourceCalendarDate();
    } else {
      this.props.setTargetCalendar(calendarName);
      this.props.calculateTargetCalendarDate();
    }
  }

  /**
   * Get the display title of the calendar
   * @param {String} calendar 
   */
  getCalendarDisplayTitle(calendar) {
    return `${calendar}`;
  }

  /**
   * Render the calendar title dropdown button
   * @param {String} currentCalendar
   * @param {Boolean} isSource 
   */
  renderCalendarTitleDropdown(currentCalendar, isSource) {
    let visibileCount = 3;
    let visibleCalendars = [];
    let hiddenCalendars = [];

    Object.keys(CALENDAR_TYPES).map((calendarKey) => {
      let calendarName = CALENDAR_TYPES[calendarKey];

      // Remove the same calendar in the other card to avoid redundancy;
      // if (isSource && calendarName === this.props.targetCalendar) {
      //   return;
      // }
      // if (!isSource && calendarName === this.props.sourceCalendar) {
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
          {this.getCalendarDisplayTitle(currentCalendar)}
        </Dropdown.Item>

        {
          visibleCalendars.map((calendarKey, index) => {
            let calendarName = CALENDAR_TYPES[calendarKey];
            if (calendarName !== currentCalendar) {
              return (
                <Dropdown.Item href="#" key={index} data-calendar-name={calendarName} className="calendar-item" onClick={(e) => this.changeCalendar(e, isSource)}>
                  {this.getCalendarDisplayTitle(calendarName)}
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
                  <Dropdown.Item href="#" className="converter-header__dropdown-item" key={index} data-calendar-name={calendarName} onClick={(e) => this.changeCalendar(e, isSource)}>
                    {this.getCalendarDisplayTitle(calendarName)}
                  </Dropdown.Item>
                )
              }
            })
          }
        </Dropdown.Menu>
      </Dropdown>
    )
  }

	render() {
		return (
      <Card className="converter-card">
        <Card.Header className="converter-header">
          <Row>
            <Col lg={5}>
              {this.renderCalendarTitleDropdown(this.props.sourceCalendar, true)}
            </Col>
            <Col lg={2}>
              <img src="images/switch.png" className="converter-header__switch-icon" onClick={this.props.switchSourceAndTargetCalendar} />
            </Col>
            <Col lg={5}>
              {this.renderCalendarTitleDropdown(this.props.targetCalendar, false)}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
            <Row>
              <Col className="converter-body__source" md={5}>
                {this.props.reverseSourceTargetCalendarFlag ? <TargetCalendar /> : <SourceCalendar />}
              </Col>
              <Col md={2}>
                <div className="converter-body__vertical-separator"></div>
              </Col>
              <Col className="converter-body__target" md={5}>
                {this.props.reverseSourceTargetCalendarFlag ? <SourceCalendar /> : <TargetCalendar />}
              </Col>
            </Row>
        </Card.Body>
      </Card>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarCard);