import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Card, Button} from "react-bootstrap";
import { switchSourceAndTargetCalendar } from "../reducers/calendarSlice";
import { CALENDAR_TYPES } from "../utils/constantsUtil";
import SourceCalendar from "./SourceCalendar";
import TargetCalendar from "./TargetCalendar";


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
    }
  };
}

class CalendarCard extends Component {
	constructor(props) {
		super(props);
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
            <Col>{this.getCalendarTitle(this.props.sourceCalendar)}</Col>
            <Col xs={1}><Button variant="secondary" size="sm" onClick={this.props.switchSourceAndTargetCalendar}>Switch</Button></Col>
            <Col>{this.getCalendarTitle(this.props.targetCalendar)}</Col>
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