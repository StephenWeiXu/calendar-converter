import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { CALENDAR_NAME_WITH_WIKI_TERM } from "../utils/constantsUtil";
import { slugify } from "../utils/commonUtil";
import { Link } from "gatsby";

export default function NavBar() {
  return (
    <>
    <Navbar variant="dark" expand="md">
      <Link to="/" className="navbar-title">Calendar Converter</Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          {
            Object.keys(CALENDAR_NAME_WITH_WIKI_TERM).map((calendarName, index) => {
              return (
                <Link className="nav-link" key={index} to={`/${slugify(calendarName)}`}>
                  {calendarName.replace(" Calendar", "")}
                </Link>
              );
            })
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
}
