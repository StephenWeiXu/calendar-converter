import React, { Component } from "react";
import { Route, NavLink, HashRouter, BrowserRouter, Switch } from "react-router-dom";
import Demo from "./Demo";
import ScrollableNav from "./ScrollableNav";

class App extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    let navStyle = {
      "position": "fixed"
    }
    let sectionStyle = {
      "height": "400px"
    }

    let h2Style = {
      "paddingTop": "100px"
    }

    return(
      <HashRouter>
        <div>
          <ScrollableNav style={navStyle}>
              <li><NavLink to="/"><span>Home</span></NavLink></li>
              <li><NavLink to="/section_1"><span>Section 1</span></NavLink></li>
              <li><NavLink to="/section_2"><span>Section 2</span></NavLink></li>
              <li><NavLink to="/section_3"><span>Section 3</span></NavLink></li>
          </ScrollableNav>

          <div>
            <Route exact path="/" component={Demo} />
            <Route path="/section_1" component={Demo} />
            <Route path="/section_2" component={Demo} />
            <Route path="/section_3" component={Demo} />

            <div>
              <div id="section_1" style={sectionStyle}><h2 style={h2Style}>Section 1</h2></div>
              <div id="section_2" style={sectionStyle}><h2 style={h2Style}>Section 2</h2></div>
              <div id="section_3" style={sectionStyle}><h2 style={h2Style}>Section 3</h2></div>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
