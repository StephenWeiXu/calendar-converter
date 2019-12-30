import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Card, Button} from "react-bootstrap";
import { CALENDAR_TYPES } from "../utils/constantsUtil";
import SourceCalendar from "./SourceCalendar";
import TargetCalendar from "./TargetCalendar";
import { switchSourceAndTargetCalendar, setSourceYear, setSourceMonth, setSourceDay, calculateTargetCalendarDate } from "../reducers/calendarSlice";


const mapStateToProps = (state) => {
  return {
    sourceCalendar: state.calendar.sourceCalendar,
    targetCalendar: state.calendar.targetCalendar,
    reverseSourceTargetCalendarFlag: state.calendar.reverseSourceTargetCalendarFlag
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchSourceAndTargetCalendar: () => {
      dispatch(switchSourceAndTargetCalendar());
    },
    setSourceYear: (year) => {
      dispatch(setSourceYear({sourceYear: year}));
    },
    setSourceMonth: (month) => {
      dispatch(setSourceMonth({sourceMonth: month}));
    },
    setSourceDay: (day) => {
      dispatch(setSourceDay({sourceDay: day}));
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
    this.props.setSourceYear(today.getFullYear());
    this.props.setSourceMonth(today.getMonth() + 1);
    this.props.setSourceDay(today.getDate());

    this.props.calculateTargetCalendarDate();
  }

  getCalendarTitle(calendar) {
    switch(calendar) {
      case CALENDAR_TYPES.SOLAR:
        return "Solar Calendar";
      case CALENDAR_TYPES.LUNAR:
        return "Lunar Calendar";
      default:
        return "Unknown";
    }
  }

	render() {
		return (
      <Card className="converter-card">
        <Card.Header className="converter-header">
          <Row>
            <Col>
              {this.getCalendarTitle(this.props.sourceCalendar)}
            </Col>
            <Col xs={1}>
              <img src="images/switch.png" className="converter-header__switch-icon" onClick={this.props.switchSourceAndTargetCalendar} />
            </Col>
            <Col>
              {this.getCalendarTitle(this.props.targetCalendar)}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
            <Container>
              <Row>
                <Col className="converter-body__source">
                  {this.props.reverseSourceTargetCalendarFlag ? <TargetCalendar /> : <SourceCalendar />}
                </Col>
                <Col className="converter-body__target">
                  {this.props.reverseSourceTargetCalendarFlag ? <SourceCalendar /> : <TargetCalendar />}
                </Col>
              </Row>
            </Container>
        </Card.Body>
      </Card>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarCard);