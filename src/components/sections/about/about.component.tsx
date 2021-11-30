import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Typography, Button } from "antd";

import { Section } from "&components/common/section/section.component";
import { Timeline } from "&components/common/timeline/timeline.component";
import { downloadPdf } from "&utils/download";
import { pdfFileName } from "&config/meta";

const { Title } = Typography;

const experience = [
  {
    occupation: "CME",
    date: "CME_DATE",
    position: "CME_POS",
    url: "https://www.gotocme.com/",
  },
  {
    occupation: "AREEBA",
    date: "AREEBA_DATE",
    position: "AREEBA_POS",
    url: "https://www.areeba.com",
  },
  {
    occupation: "TECFRAC",
    date: "TECFRAC_DATE",
    position: "TECFRAC_POS",
    url: "https://www.tecfrac.com",
  },
  {
    occupation: "NAR",
    date: "NAR_DATE",
    position: "NAR_POS",
    url: "https://www.nar.ai",
  },
];

const education = [
  {
    occupation: "ASU",
    date: "ASU_DATE",
    position: "ASU_DEGREE",
    url: "https://www.asu.edu",
  },
  {
    occupation: "AUB",
    date: "AUB_DATE",
    position: "AUB_DEGREE",
    url: "https://www.aub.edu.lb",
  },
];

export function About() {
  const { t } = useTranslation();

  return (
    <Section full title={t("ABOUT")}>
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
      <Row justify="center">
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          onClick={() => downloadPdf(".", pdfFileName)}
        >
          {t("DOWNLOAD_RESUME")}
        </Button>
      </Row>
    </Section>
  );
}
