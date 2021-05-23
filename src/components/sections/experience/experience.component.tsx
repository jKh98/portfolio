import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Typography } from "antd";

import { experience, education } from "&config/data.json";
import { Section } from "&components/styled/section/section.component";
import { Timeline } from "&components/styled/timeline/timeline.component";

const { Title } = Typography;

export function Experience() {
  const { t } = useTranslation();

  return (
    <Section title={t("EXPERIENCE_HEADING")}>
      <Row justify="space-between">
        <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
          <Title level={3}>{t("EXPERIENCE_HEADING")}</Title>
          <br />
          <Timeline data={experience} />
        </Col>
        <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
          <Title level={3}>{t("EDUCATION_HEADING")}</Title>
          <br />
          <Timeline data={education} />
        </Col>
      </Row>
    </Section>
  );
}
