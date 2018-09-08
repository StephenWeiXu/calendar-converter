import React, { Component } from "react";
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";
import ScrollspyNav from "react-scrollspy-nav";
import About from "./components/About";
import Usage from "./components/Usage";
import Example from "./components/Example";
import Configuration from "./components/Configuration";


class App extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return(
        <div>
          <div className="nav">
            <ScrollspyNav scrollTargetIds={["section_1", "section_2", "section_3"]} activeNavClass="is-active">
                <li><a href="/"><span>About</span></a></li>
                <li><a href="#section_1"><span>Usage</span></a></li>
                <li><a href="#section_2"><span>Example</span></a></li>
                <li><a href="#section_3"><span>Configuration</span></a></li>
            </ScrollspyNav>
          </div>

          <div className="content">
              <div id="header"><About /></div>
              <div id="section_1"><Usage /></div>
              <div id="section_2"><Example /></div>
              <div id="section_3"><Configuration /></div>
          </div>
        </div>

      /*
      <HashRouter>
        <div>
          <div className="nav">
            <ScrollspyNav scrollTargetIds={["section_1", "section_2", "section_3"]} router="HashRouter">
                <li><NavLink to="/"><span>Home</span></NavLink></li>
                <li><NavLink to="#section_1"><span>Section 1</span></NavLink></li>
                <li><NavLink to="#section_2"><span>Section 2</span></NavLink></li>
                <li><NavLink to="#section_3"><span>Section 3</span></NavLink></li>
            </ScrollspyNav>
          </div>

          <div className="content">
              <div id="header"><span>Welcome!</span></div>
              <div id="section_1"><span>Section 1</span></div>
              <div id="section_2"><span>Section 2</span></div>
              <div id="section_3"><span>Section 3</span></div>
          </div>
        </div>
      </HashRouter>
      */
    );
  }
}

export default App;

/*
<HashRouter>
  <div>
    <div className="nav">
      <ScrollspyNav scrollTargetIds={["section_1", "section_2", "section_3"]}>
          <li><NavLink to="/"><span>Home</span></NavLink></li>
          <li><NavLink to="#section_1"><span>Section 1</span></NavLink></li>
          <li><NavLink to="#section_2"><span>Section 2</span></NavLink></li>
          <li><NavLink to="#section_3"><span>Section 3</span></NavLink></li>
      </ScrollspyNav>
    </div>

    <div className="content">
        <div id="header"><span>Welcome!</span></div>
        <div id="section_1"><span>Section 1</span></div>
        <div id="section_2"><span>Section 2</span></div>
        <div id="section_3"><span>Section 3</span></div>
    </div>
  </div>
</HashRouter> 
*/