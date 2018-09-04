import React, { Component } from 'react';

class ScrollableNav extends Component {
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

    function easeInOutQuad(current_time, start, change, duration) {
      current_time /= duration/2;
      if (current_time < 1) return change/2*current_time*current_time + start;
      current_time--;
      return -change/2 * (current_time*(current_time-2) - 1) + start;
    };

    function scrollTo(start, to, duration) {
      let change = to - start,
          currentTime = 0,
          increment = 30;
          
      let animateScroll = function(){        
          currentTime += increment;
          let val = easeInOutQuad(currentTime, start, change, duration);
          window.scrollTo(0, val);
          if(currentTime < duration) {
              setTimeout(animateScroll, increment);
          }
      };
      animateScroll();
    }

    window.onpopstate = (event) => {
      event.preventDefault();
      let sectionID = event.target.location.hash.replace("#/", "");
      
      if(sectionID) {
        scrollTo(window.pageYOffset, document.getElementById(sectionID).offsetTop, 1200);
      } else {
        scrollTo(window.pageYOffset, 0, 1200);
      }
    }
  }

	render() {
		return(
      <ul style={this.props.style}>
        { this.props.children }
      </ul>
    );
	}
}

export default ScrollableNav;