import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Layout, Card, Row, Typography } from "antd";
import {
  RiCodeSSlashFill,
  RiDatabase2Fill,
  RiLightbulbFill,
} from "react-icons/all";

import styles from "./about.module.css";

const { Title, Text } = Typography;

export function About() {
  const { t } = useTranslation();

  return (
    <Layout id={"about"} className={styles.container}>
      <Row justify="center">
        <Title level={1} className={styles.text}>
          {t("ABOUT_HEADING")}
        </Title>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card hoverable className={styles.card}>
            <RiCodeSSlashFill className={styles.icon} />
            <Title level={3}>
              <b>{t("ABOUT_TITLE_1")}</b>
            </Title>
            <Text>{t("ABOUT_DESC_1")}</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable className={styles.card}>
            <RiDatabase2Fill className={styles.icon} />
            <Title level={3}>
              <b>{t("ABOUT_TITLE_2")}</b>
            </Title>
            <Text>{t("ABOUT_DESC_2")}</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable className={styles.card}>
            <RiLightbulbFill className={styles.icon} />
            <Title level={3}>
              <b>{t("ABOUT_TITLE_3")}</b>
            </Title>
            <Text>{t("ABOUT_DESC_3")}</Text>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
