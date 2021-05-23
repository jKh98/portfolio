import React from "react";
import { useTranslation } from "react-i18next";
import { List, Typography, Button } from "antd";
import { Parallax } from "rc-scroll-anim";

import { education as data } from "&config/data.json";
import { Section } from "&components/styled/section/section.component";

const { Title, Text } = Typography;

export function Education() {
  const { t } = useTranslation();

  return (
    <Section title={t("EDUCATION_HEADING")}>
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
                title={<Title level={4}>{t(degree)}</Title>}
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
                    <Text>{t(item)}</Text>
                  </List.Item>
                )}
              />
            </List.Item>
          </Parallax>
        )}
      />
    </Section>
  );
}
