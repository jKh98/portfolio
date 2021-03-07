import React from "react";
import { useTranslation } from "react-i18next";
import { Row, List, Layout, Typography, Tag } from "antd";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { OverPack, Parallax } from "rc-scroll-anim";

import { areebaUrl, narUrl, tecfracUrl } from "&config/meta";
import styles from "./experience.module.css";

const { Title } = Typography;

const data = [
  {
    occupation: "AREEBA",
    date: "JUNIOR_AREEBA_DATE",
    position: "JUNIOR_AREEBA_POS",
    url: areebaUrl,
    items: [
      "JUNIOR_AREEBA_ITEM_1",
      "JUNIOR_AREEBA_ITEM_2",
      "JUNIOR_AREEBA_ITEM_3",
    ],
  },
  {
    occupation: "AREEBA",
    date: "INTERN_AREEBA_DATE",
    position: "INTERN_AREEBA_POS",
    url: areebaUrl,
    items: ["INTERN_AREEBA_ITEM_1"],
  },
  {
    occupation: "TECFRAC",
    date: "PARTTIME_TECFRAC_DATE",
    position: "PARTTIME_TECFRAC_POS",
    url: tecfracUrl,
    items: [
      "PARTTIME_TECFRAC_ITEM_1",
      "PARTTIME_TECFRAC_ITEM_2",
      "PARTTIME_TECFRAC_ITEM_3",
    ],
  },
  {
    occupation: "TECFRAC",
    date: "INTERN_TECFRAC_DATE",
    position: "INTERN_TECFRAC_POS",
    url: tecfracUrl,
    items: [
      "INTERN_TECFRAC_ITEM_1",
      "INTERN_TECFRAC_ITEM_2",
      "INTERN_TECFRAC_ITEM_3",
    ],
  },
  {
    occupation: "NAR",
    date: "INTERN_NAR_DATE",
    position: "INTERN_NAR_POS",
    url: narUrl,
    items: ["INTERN_NAR_ITEM_1", "INTERN_NAR_ITEM_2"],
  },
];

export function Experience() {
  const { t } = useTranslation();

  return (
    <Layout className={styles.container}>
      <Row justify="center">
        <Title level={2}>
          <b>{t("EXPERIENCE_HEADING")}</b>
        </Title>
      </Row>
      <OverPack>
        <List
          size="large"
          bordered
          itemLayout="vertical"
          dataSource={data}
          renderItem={({ occupation, date, position, url, items }, index) => (
            <List.Item key={index} extra={t(date)}>
              <List.Item.Meta
                title={<b>{t(position)}</b>}
                description={
                  <a href={url}>
                    <Tag color="blue">{t(occupation)}</Tag>
                  </a>
                }
              />
              <List
                size="small"
                dataSource={items}
                renderItem={(item) => <List.Item>{t(item)}</List.Item>}
              ></List>
            </List.Item>
          )}
        />
      </OverPack>
    </Layout>
  );
}
