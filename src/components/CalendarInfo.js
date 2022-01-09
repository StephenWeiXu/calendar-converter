import React, { Component, useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getWikiTermDetails, getWikiTermFullSummary } from "../api/dbpedia";
import { CALENDAR_NAME_WITH_WIKI_TERM } from "../utils/constantsUtil";
import * as dbpediaUtil from "../utils/dbpediaUtil";
import { Helmet } from "react-helmet";


export default function CalendarInfo(props) {
  const [calendarDataCollection, setCalendarDataCollection] = useState({});
  const [currentCalendarName, setCurrentCalendarName] = useState("");

  useEffect(() => {
    setCurrentCalendarName(props.calendarName);

    if (!updateCalendarDataCollection.hasOwnProperty(props.calendarName)) {
      let canonicalTerm = CALENDAR_NAME_WITH_WIKI_TERM[props.calendarName];

      getWikiTermFullSummary(canonicalTerm).then(data => {
        updateCalendarDataCollection(props.calendarName, data);
      });

      // getWikiTermDetails(canonicalTerm).then(data => {
      //   updateCalendarDataCollection(props.calendarName, data);
      // });
    }
  }, []);

  function getCalendarDetailsHtml() {
    const calendarDetails = calendarDataCollection[currentCalendarName] && calendarDataCollection[currentCalendarName].extractHtml;
    const formattedCalendarDetails = calendarDetails.split("\n").map((paragraph, index) => {
      let dangerousHtml = {__html: paragraph};
      return <p key={index} dangerouslySetInnerHTML={dangerousHtml}></p>;
    });
    return formattedCalendarDetails;
  }
  
  function updateCalendarDataCollection(calendarName, data) {
    setCalendarDataCollection({
      calendarName: calendarName,
      calendarData: {
        "extractHtml": dbpediaUtil.getWikiFullSummaryHtmlWithOldApi(data),
        "sourceUrl": `https://en.wikipedia.org/wiki/${CALENDAR_NAME_WITH_WIKI_TERM[calendarName]}`
      }
    });
  }

  return (
    <div>
      <Helmet>
        <title>{props.calendarName} - Calendar Converter</title>
        <meta name="description" content={`Learn more about ${props.calendarName}, and use the calendar converter to convert a calendar date to/from ${props.calendarName}`} />
      </Helmet>
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>{props.calendarName}</h1>
            <p><Link to="/">Try the calendar converter</Link></p>
            {
              !calendarDataCollection[currentCalendarName] && <p>Loading...</p>
            }
            {
              calendarDataCollection[currentCalendarName] && (
                <>
                {getCalendarDetailsHtml()}
                <p className="mts">
                  Source: <a target="_blank" href={calendarDataCollection[currentCalendarName] && calendarDataCollection[currentCalendarName].sourceUrl}>Wikipedia</a>
                </p>
                </>
              )
            }
          </Col>
          {/* <Col>
            <img src={calendarDataCollection[currentCalendarName] && calendarDataCollection[currentCalendarName].thumbnail} />
          </Col> */}
        </Row>
      </Container>
    </div>
  )
}
