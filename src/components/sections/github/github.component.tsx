import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Layout, Typography } from "antd";
import ReactGithubCalender from "react-github-calendar";

import { githubUser } from "&config/meta";
import styles from "./github.module.css";

const { Title } = Typography;

export function Github() {
  const { t } = useTranslation();

  return (
    <Layout>
      <Row justify="center">
        <Title level={1} className={styles.text}>
          {t("ABOUT")}
        </Title>
      </Row>
      <Row justify="center">
        <ReactGithubCalender username={githubUser} />
      </Row>
    </Layout>
  );
}
