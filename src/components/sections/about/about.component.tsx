import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Layout, Card, Row, Typography } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";

import styles from "./about.module.css";

const { Title } = Typography;

export function About() {
  const { currentTheme, themes } = useThemeSwitcher();
  const { t } = useTranslation();

  return (
    <Layout className={styles.container}>
      <Row justify="center">
        <Title level={1} className={styles.text}>
          {t("ABOUT")}
        </Title>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card hoverable>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam,
            itaque repudiandae quaerat atque eos rem corrupti debitis nobis
            cumque nam laboriosam excepturi iusto praesentium sequi accusamus?
            Aliquid excepturi obcaecati aspernatur.
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id adipisci
            exercitationem nemo minus, sit iure, accusamus amet nulla ipsa
            voluptatum quaerat, illo quia necessitatibus harum dignissimos porro
            repellendus molestias nam?
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            earum ipsum laudantium impedit similique maxime voluptate, aut ad et
            quas laboriosam dicta veniam ab placeat dolorem saepe eius magni
            harum?
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
