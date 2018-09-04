import React, { Component } from "react";
import { withRouter } from 'react-router'
import $ from "jquery";

window.$ = window.jQuery = $;

class Demo extends Component {
  	constructor(props) {
	    super(props);

	    this.props = props;
	}
	
    componentDidMount() {
		this.props.history.listen((location, action) => {
			console.log(location, action);

			let sectionID = location.pathname.replace("/", "");

			if(sectionID && action === "POP") {
				$('html, body').animate({
	              scrollTop: $(`[name=${sectionID}]`).offset().top
	          	}, 500);
			}
		});
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
				<div name="section_1" style={sectionStyle}>
					<h2 style={h2Style}>Section 1</h2>
					<p>This is section 1</p>
				</div>


				<div name="section_2" style={sectionStyle}>
					<h2 style={h2Style}>Section 2</h2>
					<p>This is section 2</p>
				</div>

				<div name="section_3" style={sectionStyle}>
					<h2 style={h2Style}>Section 3</h2>
					<p>This is section 3</p>
				</div>
			</div>
		);
	}
}

export default withRouter(Demo);