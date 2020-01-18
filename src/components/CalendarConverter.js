import React, { Component } from "react";
import { Container, Row, Col, Card} from "react-bootstrap";
import ConverterCard from "./ConverterCard";
import { connect } from "react-redux";
import { setScreenSize } from "../reducers/utilsSlice";


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

  componentWillMount() {
    window.removeEventListener("resize", this.props.setScreenSize);
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarConverter);