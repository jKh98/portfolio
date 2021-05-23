import React from "react";
import { useTranslation } from "react-i18next";
import {
  Typography,
  Button,
  Timeline as AntdTimeline,
  Layout,
  Space,
  Row,
} from "antd";
import { Parallax } from "rc-scroll-anim";

const { Title, Text } = Typography;
const { Item: AntdTimelineItem } = AntdTimeline;

interface TimelineProps {
  data: TimelineItem[];
}

interface TimelineItem {
  position: string;
  occupation?: string;
  url?: string;
  date: string;
  items: string[];
}

export function Timeline(props: TimelineProps) {
  const { t } = useTranslation();
  const { data } = props;

  return (
    <AntdTimeline mode="left">
      {data.map(({ occupation, date, position, url, items }, index) => (
        <AntdTimelineItem>
          <Parallax
            key={index}
            animation={{ opacity: 1, playScale: [0.05] }}
            style={{ opacity: 0 }}
          >
            <Layout>
              <Row justify="center">
                <Title level={4}>{t(position)}</Title>
              </Row>
              <Row justify="center">
                <Space>
                  {occupation && (
                    <Button
                      block={false}
                      type="default"
                      size="small"
                      shape="round"
                      href={url}
                    >
                      {t(occupation)}
                    </Button>
                  )}
                  <Text type="secondary">
                    <b>{t(date)}</b>
                  </Text>
                </Space>
              </Row>
              <br />
              {items.map((item) => (
                <Text>- {t(item)}</Text>
              ))}
            </Layout>
            <br />
          </Parallax>
        </AntdTimelineItem>
      ))}
      <AntdTimelineItem dot={<></>} />
    </AntdTimeline>
  );
}
