import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import { HashRouter, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import "antd/dist/antd.css";
import "./App.css";

import { Landing } from "&components/pages/landing/landing.component";
import { gaKey } from "&config/meta";

ReactGA.initialize(gaKey);

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (
      navigator.userAgent.includes("Instagram") &&
      !sessionStorage.getItem("didReloadForInAppBrowser")
    ) {
      sessionStorage.setItem("didReloadForInAppBrowser", "true");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  /** This useEffect rerenders dir */
  useEffect(() => {
    // do something on language change
  }, [i18n.language]);

  return (
    <ConfigProvider direction={i18n?.dir()}>
      <HashRouter>
        <Switch>
          <Route path="/" component={Landing} />
        </Switch>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;
