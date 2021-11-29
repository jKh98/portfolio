import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Card, Row, Typography, List, Avatar } from "antd";
import {
  RiCodeSSlashFill,
  RiDatabase2Fill,
  RiLightbulbFill,
} from "react-icons/all";
import { Parallax } from "rc-scroll-anim";

import styles from "./overview.module.css";
import { Section } from "&components/common/section/section.component";

const { Title, Text } = Typography;

const data = [
  {
    title: "OVERVIEW_TITLE_1",
    description: "OVERVIEW_DESC_1",
    icon: <RiCodeSSlashFill />,
  },
  {
    title: "OVERVIEW_TITLE_2",
    description: "OVERVIEW_DESC_2",
    icon: <RiDatabase2Fill />,
  },
  {
    title: "OVERVIEW_TITLE_3",
    description: "OVERVIEW_DESC_3",
    icon: <RiLightbulbFill />,
  },
];

export function Overview() {
  const { t } = useTranslation();

  return (
    <Section full title={t("OVERVIEW_HEADING")}>
      <Parallax
        animation={{ scale: 1, playScale: [0.2, 0.55] }}
        style={{ transform: "scale(0.8)" }}
      >
        <Row>
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 3, lg: 3, xl: 3, xxl: 3 }}
            dataSource={data}
            renderItem={({ title, description, icon }) => (
              <Col flex={1} className={styles.col}>
                <Card className={styles.card} bordered={false}>
                  <Avatar size={75} icon={icon} className={styles.icon} />
                  <Title level={3}>{t(title)}</Title>
                  <Text strong type="secondary">
                    {t(description)}
                  </Text>
                </Card>
              </Col>
            )}
          />
        </Row>
      </Parallax>
    </Section>
  );
}
