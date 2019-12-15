import React, { Component } from "react";
import {Solar, Lunar, LunarSolarConverter} from "../lib/LunarSolarConverter";
import { Container, Row, Col, Card} from "react-bootstrap";
import ConverterCard from "./ConverterCard";

class CalendarConverter extends Component {
	constructor(props) {
		super(props);

		this.solar = new Solar();
		this.lunar = new Lunar();
		this.converter = new LunarSolarConverter();

		this.solarToLunar();
	}

	solarToLunar() {
		this.solar.solarYear = 2019;
		this.solar.solarMonth = 12;
		this.solar.solarDay = 15;
		let lunar = this.converter.SolarToLunar(this.solar);
		console.log(lunar);
		return lunar;
	}

	render() {
		return (
			<div className="section-content">
				<Container>
					<Row>
						<Col>
							<ConverterCard />
						</Col>
					</Row>
				</Container>

				{/* <p>{this.solarToLunar().lunarYear}, {this.solarToLunar().lunarMonth}, {this.solarToLunar().lunarDay}</p> */}
			</div>
		);
	}
}

export default CalendarConverter;