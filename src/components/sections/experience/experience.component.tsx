import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Layout, Typography, Card, Col } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";

import { sections } from "&config/meta";
import styles from "./experience.module.css";

import AreebaLogo from "&assets/images/areeba-logo.png";
import TecfracLogo from "&assets/images/tecfrac-logo.png";

const { Title } = Typography;

export function Experience() {
  const { t } = useTranslation();
  const { currentTheme, themes } = useThemeSwitcher();

  return (
    <Layout id={sections[1].key} className={styles.container}>
      <Row justify="center">
        <Title level={2}>
          <b>{t("EXPERIENCE_HEADING")}</b>
        </Title>
      </Row>
      <Row justify="center">
        <Col>
          <Card
            size="small"
            cover={
              <a href={"https://www.areeba.com"}>
                <img
                  className={styles.logo}
                  src={AreebaLogo}
                  alt="areeba sal"
                ></img>
              </a>
            }
          >
            <Card.Meta
              description={t("EXPERIENCE_1_DATE")}
              title="Default size card"
            ></Card.Meta>
          </Card>
          <Card size="small">
            <Card.Meta
              description={t("EXPERIENCE_3_DATE")}
              title="Default size card"
            ></Card.Meta>
            <a href={"https://www.tecfrac.com"}>
              <img
                className={styles.logo}
                src={TecfracLogo}
                alt="tecfrac"
              ></img>
            </a>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
