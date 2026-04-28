import React from "react";


export  default function Footer() {
    return (
      <footer>
        This was coded by
        <a
          href="https://github.com/shecodi/abijah-react-weather-app/tree/main/src"
          className="link"
          target="_blank"
        >
          {" "}
          Abijah God'swill Kutwane{" "}
        </a>
        and is
        {""}
        <a
          href="https://abijah-react-weather-app.netlify.app/"
          className="link"
          target="_blank"
        >
          {""} open sourced
        </a>
        .
      </footer>
    );
}