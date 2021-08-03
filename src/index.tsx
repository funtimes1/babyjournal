import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth } from "../src/components/auth/Auth";
import {
  defaultTheme,
  ThemeProvider,
  Preflight,
} from "@xstyled/styled-components";

const theme = {
  ...defaultTheme,
  // Customize your theme here
};

// import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Preflight />
      <Auth />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
