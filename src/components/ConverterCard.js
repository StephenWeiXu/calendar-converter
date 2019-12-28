import React, { Component } from "react";
import { connect } from "react-redux";
import {Solar, Lunar, LunarSolarConverter} from "../lib/LunarSolarConverter";
import { Container, Row, Col, Card, Button} from "react-bootstrap";
import { CALENDAR_TYPES, switchSourceAndTargetCalendar } from "../reducers/converterSlice";
import SourceCalendar from "./SourceCalendar";

const mapStateToProps = (state) => {
  return {
    sourceCalendar: state.converter.sourceCalendar,
    targetCalendar: state.converter.targetCalendar
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
      <Card>
        <Card.Header className="converter-header">
          <Row>
            <Col>{this.getCalendarTitle(this.props.sourceCalendar)}</Col>
            <Col xs={1}><Button variant="secondary" size="sm" onClick={this.props.switchSourceAndTargetCalendar}>Switch</Button></Col>
            <Col>{this.getCalendarTitle(this.props.targetCalendar)}</Col>
          </Row>
        </Card.Header>
        <Card.Body>
            <Row>
              <Col className="converter-body__source">
                <SourceCalendar />
              </Col>
              <Col className="converter-body__result">2 of 2</Col>
            </Row>
        </Card.Body>
      </Card>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarCard);