import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import { HashRouter, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import "antd/dist/antd.css";
import "./App.css";

import { Landing } from "&components/pages/landing/landing.component";
import { gaKey, sections } from "&config/meta";

ReactGA.initialize(gaKey);

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const validHashes = [...Object.values(sections), "home"];
    console.log(window.location.hash);
    if (window.location.hash.includes("#/")) {
      window.location.hash = "";
    }
  }, []);

  /** This useEffect rerenders dir */
  useEffect(() => {
    // do something on language change
  }, [i18n.language]);

  return (
    <ConfigProvider direction={i18n?.dir()}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;
