import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card} from "react-bootstrap";
import ConverterCard from "./ConverterCard";
import { Helmet } from "react-helmet";

const isBrowser = () => typeof window !== "undefined";

export default function CalendarConverter() {
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
		// when component mount, update screenSize state everytime browser window resizes
    isBrowser() && window.addEventListener("resize", () => setScreenSize(window.innerWidth));

    // when component unmount
    return () => {
      isBrowser() && window.removeEventListener("resize", () => setScreenSize(window.innerWidth));
    }
  }, []);

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
