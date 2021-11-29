import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Typography, Button } from "antd";

import { experience, education } from "&config/data.json";
import { Section } from "&components/common/section/section.component";
import { Timeline } from "&components/common/timeline/timeline.component";

const { Title } = Typography;

export function About() {
  const { t } = useTranslation();

  return (
    <Section full title={t("ABOUT")}>
      {/* <Row justify="center">
        <Button type="primary" size="large">
          {t("DOWNLOAD_RESUME")}
        </Button>
      </Row> */}
      <Row justify="center">
        <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
          <Row justify="center">
            <Title level={3}>{t("EXPERIENCE_HEADING")}</Title>
          </Row>
          <br />
          <Timeline data={experience} />
        </Col>
        <Col xs={0} sm={0} md={0} lg={2} xl={2} xxl={2} />
        <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
          <Row justify="center">
            <Title level={3}>{t("EDUCATION_HEADING")}</Title>
          </Row>
          <br />
          <Timeline data={education} />
        </Col>
      </Row>
    </Section>
  );
}
