import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import "antd/dist/antd.css";
import "./App.css";

import { Landing } from "./components/pages/landing/landing.component";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    ReactGA.initialize("UA-161722008-02");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  /** This useEffect rerenders dir */
  useEffect(() => {
    // do something on language change
  }, [i18n.language]);

  return (
    <ConfigProvider direction={i18n?.dir()}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
