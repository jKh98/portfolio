import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Layout, Row, Typography, Image } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";

import styles from "./about.module.css";
import DayBg from "&assets/images/day.jpg";
import NightBg from "&assets/images/night.jpg";
import { sections } from "&config/meta";

const { Title } = Typography;
const lightGradient = "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8))";
const darkGradient =
  "linear-gradient(rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.1))";

export function About() {
  const { currentTheme, themes } = useThemeSwitcher();
  const { t } = useTranslation();

  return (
    <Layout
      className={styles.full}
      style={{
        backgroundImage:
          currentTheme === themes.dark
            ? `${darkGradient}, url(${NightBg})`
            : `${lightGradient}, url(${DayBg})`,
      }}
    >
      <Row justify="space-around" align="middle" className={styles.full}>
        <Image width={120} height={120} className={styles.profile} />
        <Title>{t(sections[0].title)}</Title>
        {/* <Paragraph>{t(sections[0].description)}</Paragraph> */}
      </Row>
    </Layout>
  );
}
