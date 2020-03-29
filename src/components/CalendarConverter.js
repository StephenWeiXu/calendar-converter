import React, { Component } from "react";
import { Container, Row, Col, Card} from "react-bootstrap";
import ConverterCard from "./ConverterCard";
import { connect } from "react-redux";
import { setScreenSize } from "../reducers/utilsSlice";
import { Helmet } from "react-helmet";


const mapStateToProps = (state) => {
  return {
    screenSize: state.utils.screenSize
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScreenSize: () => {
      dispatch(setScreenSize({screenSize: window.innerWidth}));
    }
  };
}


class CalendarConverter extends Component {
	constructor(props) {
		super(props);
	}

  componentDidMount() {
		// update screenSize state everytime browser window resizes
    window.addEventListener("resize", this.props.setScreenSize);
  }

  componentWillUnMount() {
    window.removeEventListener("resize", this.props.setScreenSize);
  }

	render() {
		return (
			<div>
        <Helmet>
          <meta name="description" content="Welcome to this beautiful calendar converter. Provide fast and accurate calendar conversion. Convert a calendar date among various calendars including Gregorian calendar, Lunar calendar, Hebrew/Jewish calendar, Islamic calendar, Julian calendar, Persian calendar, Indian National calendar..." />
        </Helmet>
        <h1 className="visually-hidden">Calendar Converter</h1>
        <Row>
          <Col>
            <ConverterCard />
          </Col>
        </Row>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarConverter);