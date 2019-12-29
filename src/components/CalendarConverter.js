import React, { Component } from "react";
import { Container, Row, Col, Card} from "react-bootstrap";
import ConverterCard from "./ConverterCard";

class CalendarConverter extends Component {
	constructor(props) {
		super(props);
}

	render() {
		return (
			<div>
        <Row>
          <Col>
            <ConverterCard />
          </Col>
        </Row>
			</div>
		);
	}
}

export default CalendarConverter;