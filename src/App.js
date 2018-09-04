import React, { Component } from 'react';
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";
import $ from "jquery";
import Demo from './Demo';


window.$ = window.jQuery = $;


class App extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  componentDidMount() {
    // let scrollHandled = false;
    // $(document).on("scroll", (event) => {
    //  if(!scrollHandled) {
    //    scrollHandled = true;

    //    $("content").addClass("background", "#000");

    //    setTimeout(() => {
    //      $(".projects-nav a span").trigger("click"); 
    //    }, 0);
    //    scrollHandled = false;
    //  }
    // });

    $(".nav a").on("click", (event)=> {
      event.preventDefault();

      let sectionID = $(event.target).parent().attr("href").replace("#/", "");
      console.log(sectionID);

      if(sectionID) {
        window.location.hash = sectionID;

          $('html, body').animate({
              scrollTop: $(`[name=${sectionID}]`).offset().top
          }, 500);
      } else {
        window.location.hash = "/";

        $('html, body').animate({
              scrollTop: 0
          }, 500);
      }
    })
  }

  render() {
    let navStyle = {
      "position": "fixed"
    }

    return(
      <HashRouter>
        <div>
          <div className="nav" style={navStyle}>
            <ul>
              <li onClick={this.handleNavClick}><NavLink to="/"><span>Home</span></NavLink></li>
              <li onClick={this.handleNavClick}><NavLink to="/section_1"><span>Section 1</span></NavLink></li>
              <li onClick={this.handleNavClick}><NavLink to="/section_2"><span>Section 2</span></NavLink></li>
              <li onClick={this.handleNavClick}><NavLink to="/section_3"><span>Section 3</span></NavLink></li>
            </ul>
          </div>

          
          <div id="content" className="content">
            <Switch>
              <Route exact path="/" component={Demo} />
              <Route path="/section_1" component={Demo} />
              <Route path="/section_2" component={Demo} />
              <Route path="/section_3" component={Demo} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
