import React, { Component } from "react";
import {Solar, Lunar, LunarSolarConverter} from "../lib/LunarSolarConverter";
import { Container, Row, Col, Card, Button} from "react-bootstrap";

class CalendarCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <Card>
        <Card.Header className="converter-header">
          <Row>
            <Col>Solar Calendar</Col>
            <Col xs={1}><Button variant="secondary" size="sm">Switch</Button></Col>
            <Col>Lunar Calendar</Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col className="converter-body__source">1 of 2</Col>
              <Col className="converter-body__result">2 of 2</Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
		);
	}
}

export default CalendarCard;