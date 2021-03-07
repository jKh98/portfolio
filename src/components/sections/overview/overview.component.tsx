import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Layout, Card, Row, Typography, List } from "antd";
import {
  RiCodeSSlashFill,
  RiDatabase2Fill,
  RiLightbulbFill,
} from "react-icons/all";

import styles from "./overview.module.css";

const { Title, Text } = Typography;

const data = [
  {
    title: "ABOUT_TITLE_1",
    description: "ABOUT_DESC_1",
    icon: <RiCodeSSlashFill className={styles.icon} />,
  },
  {
    title: "ABOUT_TITLE_2",
    description: "ABOUT_DESC_2",
    icon: <RiDatabase2Fill className={styles.icon} />,
  },
  {
    title: "ABOUT_TITLE_3",
    description: "ABOUT_DESC_3",
    icon: <RiLightbulbFill className={styles.icon} />,
  },
];

export function Overview() {
  const { t } = useTranslation();

  return (
    <Layout className={styles.container}>
      <Row justify="center">
        <Title level={2}>
          <b>{t("ABOUT_HEADING")}</b>
        </Title>
      </Row>
      <Row>
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 3, lg: 3, xl: 3, xxl: 3 }}
          dataSource={data}
          renderItem={({ title, description, icon }) => (
            <Col flex={1} className={styles.col}>
              <Card className={styles.card}>
                {icon}
                <Title level={3}>
                  <b>{t(title)}</b>
                </Title>
                <Text>{t(description)}</Text>
              </Card>
            </Col>
          )}
        />
      </Row>
    </Layout>
  );
}
