import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Layout, Card, Row, Typography } from "antd";
import {
  RiCodeSSlashFill,
  RiDatabase2Fill,
  RiLightbulbFill,
} from "react-icons/all";

import styles from "./about.module.css";
import { sections } from "&config/meta";

const { Title, Text } = Typography;
const { Header } = Layout;

export function About() {
  const { t } = useTranslation();

  return (
    <Layout id={sections[0].key} className={styles.container}>
      <Row justify="center">
        <Title level={2}>
          <b>{t("ABOUT_HEADING")}</b>
        </Title>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Card hoverable className={styles.card}>
            <RiCodeSSlashFill className={styles.icon} />
            <Title level={3}>
              <b>{t("ABOUT_TITLE_1")}</b>
            </Title>
            <Text>{t("ABOUT_DESC_1")}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Card hoverable className={styles.card}>
            <RiDatabase2Fill className={styles.icon} />
            <Title level={3}>
              <b>{t("ABOUT_TITLE_2")}</b>
            </Title>
            <Text>{t("ABOUT_DESC_2")}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
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
