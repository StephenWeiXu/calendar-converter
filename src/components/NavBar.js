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
        <Navbar.Brand>
          <Link to="/" className="navbar-title">Calendar Converter</Link>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown className="navbar-dropdown" title="Calendars">
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
