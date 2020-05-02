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
      <Navbar variant="dark" expand="md">
        <Navbar.Brand href="#/" className="navbar-title">Calendar Converter</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            {
              Object.keys(CALENDAR_NAME_WITH_WIKI_TERM).map((calendarName, index) => {
                return (
                  <Nav.Link key={index} href={`#/${slugify(calendarName)}`}>
                    {calendarName.replace(" Calendar", "")}
                  </Nav.Link>
                );
              })
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </>
    );
  }
}

export default NavBar;
