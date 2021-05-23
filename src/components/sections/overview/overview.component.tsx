import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Card, Row, Typography, List } from "antd";
import {
  RiCodeSSlashFill,
  RiDatabase2Fill,
  RiLightbulbFill,
} from "react-icons/all";

import styles from "./overview.module.css";
import { Parallax } from "rc-scroll-anim";
import { Section } from "&components/styled/section/section.component";

const { Title, Text } = Typography;

const data = [
  {
    title: "OVERVIEW_TITLE_1",
    description: "OVERVIEW_DESC_1",
    icon: <RiCodeSSlashFill className={styles.icon} />,
  },
  {
    title: "OVERVIEW_TITLE_2",
    description: "OVERVIEW_DESC_2",
    icon: <RiDatabase2Fill className={styles.icon} />,
  },
  {
    title: "OVERVIEW_TITLE_3",
    description: "OVERVIEW_DESC_3",
    icon: <RiLightbulbFill className={styles.icon} />,
  },
];

export function Overview() {
  const { t } = useTranslation();

  return (
    <Section title={t("OVERVIEW_HEADING")}>
      <Parallax
        animation={{ scale: 1, playScale: [0.1] }}
        style={{ transform: "scale(0.7)" }}
      >
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
      </Parallax>
    </Section>
  );
}
