import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./view/styles/index.css";
import "./fonts/Montserrat-Light.ttf";
import "./fonts/Montserrat-Light.ttf";
import "./fonts/Montserrat-Medium.ttf";
import "./fonts/Montserrat-Bold.ttf";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,

  document.getElementById("root")
);
