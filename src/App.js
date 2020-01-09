import React, { Component } from "react";
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";
import CalendarConverter from "./components/CalendarConverter";
import Navbar from "react-bootstrap/Navbar";


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Navbar bg="dark" variant="dark" className="nav-section">
            <Navbar.Brand href="/">Calendar Date Converter</Navbar.Brand>
          </Navbar>

          <div className="content">
              <CalendarConverter />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
