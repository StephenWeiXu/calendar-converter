import React, { Component } from "react";

class Demo extends Component {
  	constructor(props) {
	    super(props);

	    this.props = props;
	}
	
    componentDidMount() {
	}

	render() {
		let sectionStyle = {
			"height": "400px"
		}

		let h2Style = {
			"paddingTop": "100px"
		}

		return(
			<div>
				<div id="section_1" style={sectionStyle}>
					<h2 style={h2Style}>Section 1</h2>
					<p>This is section 1</p>
				</div>


				<div id="section_2" style={sectionStyle}>
					<h2 style={h2Style}>Section 2</h2>
					<p>This is section 2</p>
				</div>

				<div id="section_3" style={sectionStyle}>
					<h2 style={h2Style}>Section 3</h2>
					<p>This is section 3</p>
				</div>
			</div>
		);
	}
}

export default Demo;