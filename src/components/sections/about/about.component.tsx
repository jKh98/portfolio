import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Typography, Button } from "antd";

import { experience, education } from "&config/data.json";
import { Section } from "&components/styled/section/section.component";
import { Timeline } from "&components/styled/timeline/timeline.component";

const { Title } = Typography;

export function About() {
  const { t } = useTranslation();

  return (
    <Section title={t("ABOUT")}>
      <Row justify="center">
        <Button type="primary" size="large">
          Download
        </Button>
      </Row>
      <br />
      <br />
      <Row justify="space-between">
        <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
          <Row justify="center">
            <Title level={2}>{t("EXPERIENCE_HEADING")}</Title>
          </Row>
          <br />
          <Timeline data={experience} />
        </Col>
        <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
          <Row justify="center">
            <Title level={2}>{t("EDUCATION_HEADING")}</Title>
          </Row>
          <br />
          <Timeline data={education} />
        </Col>
      </Row>
      <Row justify="center">
        <Button type="primary" size="large">
          Download
        </Button>
      </Row>
    </Section>
  );
}
