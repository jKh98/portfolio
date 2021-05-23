import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, Button, Timeline, Layout, Row, Col } from "antd";
import { Parallax } from "rc-scroll-anim";

import { experience as data } from "&config/data.json";
import { Section } from "&components/styled/section/section.component";

const { Title, Text } = Typography;

export function Experience() {
  const { t } = useTranslation();

  return (
    <Section title={t("EXPERIENCE_HEADING")}>
      <Row>
        <Col xs={22} sm={22} md={18} lg={18} xl={18} xxl={16}>
          <Timeline mode="left">
            {data.map(({ occupation, date, position, url, items }, index) => (
              <Timeline.Item
                label={
                  <Parallax
                    animation={{ opacity: 1, playScale: [0.05] }}
                    style={{ opacity: 0 }}
                  >
                    <div>
                      <Text type="secondary">
                        <b>{t(date)}</b>
                      </Text>
                    </div>
                  </Parallax>
                }
              >
                <Parallax
                  key={index}
                  animation={{ opacity: 1, playScale: [0.05] }}
                  style={{ opacity: 0 }}
                >
                  <Layout>
                    <div>
                      <Title level={4}>{t(position)}</Title>
                      <Button
                        block={false}
                        type="default"
                        size="small"
                        shape="round"
                        href={url}
                      >
                        {t(occupation)}
                      </Button>
                    </div>
                    <br />

                    {items.map((item) => (
                      <Text>- {t(item)}</Text>
                    ))}
                  </Layout>
                  <br />
                </Parallax>
              </Timeline.Item>
            ))}
          </Timeline>
        </Col>
      </Row>
    </Section>
  );
}
