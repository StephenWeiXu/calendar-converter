import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import CalendarConverter from "./components/CalendarConverter";
import NavBar from "./components/NavBar";
import Feedback from "./components/Feedback";
import CalendarInfo from "./components/CalendarInfo";
import { slugify } from "./utils/commonUtil";
import { CALENDAR_NAME_WITH_WIKI_TERM } from "./utils/constantsUtil";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <div>
          <NavBar />

          <div className="content">
            <Route exact path="/" component={CalendarConverter} />
            <Route path="/feedback" component={Feedback} />
            {
              Object.keys(CALENDAR_NAME_WITH_WIKI_TERM).map((calendarName, index) => {
                return <Route
                  key={index}
                  path={`/${slugify(calendarName)}`}
                  component={() => <CalendarInfo calendarName={calendarName} />} />;
              })
            }
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
