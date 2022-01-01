import React from "react";
import ReactDOM from "react-dom";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { I18nextProvider } from "react-i18next";
import i18n from "&config/i18n";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const getDefaultTheme = () => {
  if (
    window.matchMedia("(prefers-color-scheme: dark)").matches ||
    localStorage.getItem("theme") === "dark"
  ) {
    return "dark";
  }
  return "light";
};

window.addEventListener("load", () => {
  ReactDOM.render(
    // <React.StrictMode>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={getDefaultTheme()}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ThemeSwitcherProvider>,
    // </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
