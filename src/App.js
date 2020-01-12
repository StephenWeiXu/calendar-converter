import React, { Component } from "react";
import { Route, NavLink, HashRouter, Link } from "react-router-dom";
import CalendarConverter from "./components/CalendarConverter";
import Navbar from "react-bootstrap/Navbar";
import Feedback from "./components/Feedback";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Navbar bg="dark" variant="dark" className="nav-section">
            <Navbar.Brand href="/">Calendar Converter</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Link to="/feedback" className="nav-right">Feedback</Link>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>

          <div className="content">
            <Route exact path="/" component={CalendarConverter} />
            <Route path="/feedback" component={Feedback} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
