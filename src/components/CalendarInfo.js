import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getWikiTermDetails, getWikiTermFullSummary } from "../api/dbpedia";
import { setCalendarDataCollection, setCurrentCalendarName } from "../reducers/calendarDataSlice";
import { CALENDAR_NAME_WITH_WIKI_TERM } from "../utils/constantsUtil";
import * as dbpediaUtil from "../utils/dbpediaUtil";


const mapStateToProps = (state) => {
  let calendarDataCollection = state.calendarData.calendarDataCollection;
  let currentCalendarName = state.calendarData.currentCalendarName;
  return {
    calendarDataCollection: calendarDataCollection,
    currentCalendarName: currentCalendarName,
    currentCalendarData: calendarDataCollection[currentCalendarName]
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCalendarDataCollection: (calendarName, data) => {
      dispatch(setCalendarDataCollection({
        calendarName: calendarName,
        calendarData: {
          "extractHtml": dbpediaUtil.getWikiFullSummaryHtmlWithOldApi(data),
          "sourceUrl": `https://en.wikipedia.org/wiki/${CALENDAR_NAME_WITH_WIKI_TERM[calendarName]}`
        }
      }));
    },
    setCurrentCalendarName: (calendarName) => {
      dispatch(setCurrentCalendarName({currentCalendarName: calendarName}));
    }
  };
}

class CalendarInfo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setCurrentCalendarName(this.props.calendarName);

    if (!this.props.setCalendarDataCollection.hasOwnProperty(this.props.calendarName)) {
      let canonicalTerm = CALENDAR_NAME_WITH_WIKI_TERM[this.props.calendarName];

      getWikiTermFullSummary(canonicalTerm).then(data => {
        this.props.setCalendarDataCollection(this.props.calendarName, data);
      });

      // getWikiTermDetails(canonicalTerm).then(data => {
      //   this.props.setCalendarDataCollection(this.props.calendarName, data);
      // });
    }
  }

  getCalendarDetailsHtml() {
    const calendarDetails = this.props.currentCalendarData && this.props.currentCalendarData.extractHtml;
    const formattedCalendarDetails = calendarDetails.split("\n").map((paragraph, index) => {
      let dangerousHtml = {__html: paragraph};
      return <p key={index} dangerouslySetInnerHTML={dangerousHtml}></p>;
    });
    return formattedCalendarDetails;
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm={{ span: 8, offset: 2 }}>
              <h1>{this.props.calendarName}</h1>
              <p><Link to="/">Try the calendar converter</Link></p>
              {
                !this.props.currentCalendarData && <p>Loading...</p>
              }
              {
                this.props.currentCalendarData && (
                  <>
                  {this.getCalendarDetailsHtml()}
                  <p className="mts">
                    Source: <a target="_blank" href={this.props.currentCalendarData && this.props.currentCalendarData.sourceUrl}>Wikipedia</a>
                  </p>
                  </>
                )
              }
            </Col>
            {/* <Col>
              <img src={this.props.currentCalendarData && this.props.currentCalendarData.thumbnail} />
            </Col> */}
          </Row>
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarInfo);