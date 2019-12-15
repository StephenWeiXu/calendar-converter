import React, { Component } from "react";
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";
import CalendarConverter from "./components/CalendarConverter";


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <div>
          <div className="nav">
            <ul>
              <li>
                <NavLink to="/"><span>Calendar Converter</span></NavLink>
              </li>
            </ul>
          </div>

          <div className="content">
              <div><CalendarConverter /></div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
