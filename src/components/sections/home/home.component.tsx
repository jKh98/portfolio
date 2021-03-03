import React from "react";
import { RiMouseLine } from "react-icons/all";
import { useTranslation } from "react-i18next";
import { Col, Layout, Row, Typography } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";

import styles from "./home.module.css";

import DayBg from "&assets/images/day.jpg";
import NightBg from "&assets/images/night.jpg";
import Profile from "&assets/images/profile.jpg";

const { Title } = Typography;
const lightGradient = "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4))";
const darkGradient =
  "linear-gradient(rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.1))";

export function Home() {
  const { currentTheme, themes } = useThemeSwitcher();
  const { t } = useTranslation();

  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

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
        <Col>
          <Row justify="center">
            <img
              className={styles.profile}
              src={Profile}
              alt="profile_picture"
            />
          </Row>
          <Row justify="center">
            <Col xs={22} sm={22} md={16} lg={16} xl={16} xxl={12}>
              <Title level={1} className={styles.text}>
                <b> {t("FULL_NAME")}</b>
              </Title>
              <Title level={2} className={styles.text}>
                {t("HOME_MESSAGE")}
              </Title>
            </Col>
          </Row>
        </Col>
      </Row>
      <RiMouseLine onClick={handleScroll} className={styles.icon} />
    </Layout>
  );
}
