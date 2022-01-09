import React from "react";
import CalendarConverter from "../components/CalendarConverter";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/index.scss";

function getCurrentYear() {
  const today = new Date();
  return today.getFullYear();
}

export default function App() {
  return (
      <div>
        <NavBar />

        <div className="content">
          <CalendarConverter />
        </div>

        <div className="footer txtc">
          Calendar Converter © {getCurrentYear()}. All Rights Reserved.
        </div>
      </div>
  );
}
