import React, { Component } from "react";
import { Helmet } from "react-helmet";


class Feedback extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Feedback - Calendar Converter</title>
          <meta name="description" content="Give your feedback on the calendar converter. Let us know how we can improve the calendar converter to provide you a better experience." />
        </Helmet>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdlYtQq7s0606kmrYC8aIPUOKuoIvYzN-v7sL_OH7v0j5HsFw/viewform?embedded=true"
          width="100%"
          height="1200"
          frameBorder="0">
            Loading…
        </iframe>
      </>
    );
  }
}

export default Feedback;
