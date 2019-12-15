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
            <Col xs={1}><Button variant="primary">switch</Button></Col>
            <Col>Lunar Calendar</Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
        </Card.Body>
      </Card>
		);
	}
}

export default CalendarCard;