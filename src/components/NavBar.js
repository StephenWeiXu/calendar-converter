import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavDropdown, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { CALENDAR_NAME_WITH_WIKI_TERM } from "../utils/constantsUtil";
import { slugify } from "../utils/commonUtil";


class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      <Navbar variant="dark" expand="sm">
        <Navbar.Brand href="#/" className="navbar-title">Calendar Converter</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown className="navbar-dropdown mrs" title="Calendars">
            {
              Object.keys(CALENDAR_NAME_WITH_WIKI_TERM).map((calendarName, index) => {
                return (
                  <NavDropdown.Item key={index} href={`#/${slugify(calendarName)}`}>
                    {calendarName.replace(" Calendar", "")}
                  </NavDropdown.Item>
                );
              })
            }
            </NavDropdown>
            <Nav.Link href="#/feedback">Feedback</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </>
    );
  }
}

export default NavBar;