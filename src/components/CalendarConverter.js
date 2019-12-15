import React, { Component } from "react";
import {Solar, Lunar, LunarSolarConverter} from "../lib/LunarSolarConverter";

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
				<h1>react-scrollspy-nav</h1>
				<p><b>react-scrollspy-nav</b> is a React component that provides smooth scrolling navigation to the page. 
				It also acconuts for the factor that a React app may use different React router and therefore has 
				different url patterns (for example the hash pathname in <i>HashRouter</i>).
				</p>
				<p>{this.solarToLunar().lunarYear}, {this.solarToLunar().lunarMonth}, {this.solarToLunar().lunarDay}</p>
			</div>
		);
	}
}

export default CalendarConverter;