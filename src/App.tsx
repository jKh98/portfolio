import React from "react";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import "./App.css";

import { Landing } from "./components/pages/landing/landing.component";

function App() {
  const { i18n } = useTranslation();

  return (
    <ConfigProvider direction={i18n.dir()}>
      <div className="App">
        <Landing />
      </div>
    </ConfigProvider>
  );
}

export default App;
