import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Layout, Typography } from "antd";
import ReactGithubCalender from "react-github-calendar";
import { useThemeSwitcher } from "react-css-theme-switcher";

import { githubUser } from "&config/meta";
import styles from "./github.module.css";
import { githubDark, githubLight } from "&config/color";

const { Title } = Typography;

export function Github() {
  const { t } = useTranslation();
  const { currentTheme, themes } = useThemeSwitcher();

  return (
    <Layout className={styles.container}>
      <Row justify="center">
        <Title level={2}>
          <b>{t("GITHUB_HEADING")}</b>
        </Title>
      </Row>
      <Row justify="center">
        <ReactGithubCalender
          username={githubUser}
          fontSize={16}
          blockMargin={4}
          theme={currentTheme === themes.dark ? githubDark : githubLight}
        />
      </Row>
    </Layout>
  );
}
