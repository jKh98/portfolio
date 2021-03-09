import React from "react";
import { useTranslation } from "react-i18next";
import { Row, List, Layout, Typography, Button } from "antd";
import { Parallax } from "rc-scroll-anim";

import { aubUrl } from "&config/meta";
import styles from "./education.module.css";

const { Title, Text } = Typography;

const data = [
  {
    school: "AUB",
    date: "AUB_DATE",
    degree: "AUB_DEGREE",
    url: aubUrl,
    items: ["AUB_ITEM_1", "AUB_ITEM_2", "AUB_ITEM_3"],
  },
];

export function Education() {
  const { t } = useTranslation();

  return (
    <Layout className={styles.container}>
      <Row justify="center">
        <Title level={2}>
          <b>{t("EDUCATION_HEADING")}</b>
        </Title>
      </Row>
      <List
        size="large"
        bordered
        itemLayout="vertical"
        dataSource={data}
        renderItem={({ school, date, degree, url, items }, index) => (
          <Parallax
            key={index}
            animation={{ opacity: 1, playScale: [0.1] }}
            style={{ opacity: 0 }}
          >
            <List.Item
              extra={
                <Text type="secondary">
                  <b>{t(date)}</b>
                </Text>
              }
            >
              <List.Item.Meta
                title={<b>{t(degree)}</b>}
                description={
                  <Button type="primary" size="small" shape="round" href={url}>
                    {t(school)}
                  </Button>
                }
              />
              <List
                size="small"
                dataSource={items}
                renderItem={(item) => (
                  <List.Item>
                    <Text> {t(item)}</Text>
                  </List.Item>
                )}
              />
            </List.Item>
          </Parallax>
        )}
      />
    </Layout>
  );
}
