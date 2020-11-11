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
import AuthProvider from "./controller/provider/AuthProvider";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,

  document.getElementById("root")
);
