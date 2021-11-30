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
}

export function Timeline(props: TimelineProps) {
  const { t } = useTranslation();
  const { data } = props;

  return (
    <AntdTimeline mode="left">
      {data.map(({ occupation, date, position, url }, index) => (
        <AntdTimelineItem key={index}>
          <Parallax
            style={{ opacity: 0 }}
            animation={{ opacity: 1, playScale: [0.2, 0.55] }}
          >
            <Layout>
              <Row justify="space-between">
                <Title level={5}>{t(position)}</Title>
                <Text type="secondary">
                  <b>{t(date)}</b>
                </Text>
              </Row>
              <Row justify="start">
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
                </Space>
              </Row>
              <br />
            </Layout>
          </Parallax>
        </AntdTimelineItem>
      ))}
    </AntdTimeline>
  );
}
