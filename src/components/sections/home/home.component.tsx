import React from "react";
import { RiMouseLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { Col, Layout, Row, Typography } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";

import { Social } from "&components/sections/social/social.component";
import { useWindowSize } from "&hooks/useWindowSize";
import Profile from "&assets/images/profile.png";

import styles from "./home.module.css";

const { Title } = Typography;

export function Home() {
  const { currentTheme, themes } = useThemeSwitcher();
  const { width } = useWindowSize();
  const { t } = useTranslation();

  const isMobile = width <= 768;

  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const renderProfileStyle = () =>
    currentTheme === themes.light ? { boxShadow: "0 0 10px" } : {};

  return (
    <Layout>
      <Row justify="space-around" align="middle" className={styles.full}>
        <Col>
          <Row justify="center">
            <img
              className={styles.profile}
              style={renderProfileStyle()}
              alt="profile_picture"
              src={Profile}
            />
          </Row>
          <Row justify="center">
            <Col xs={22} sm={22} md={16} lg={16} xl={16} xxl={12}>
              <Title level={1} className={styles.text}>
                <b>{t("FULL_NAME")}</b>
              </Title>
              <Title level={2} className={styles.text}>
                {t("HOME_MESSAGE")}
              </Title>
            </Col>
          </Row>
          <Row justify="center">
            <Social />
          </Row>
        </Col>
      </Row>
      {!isMobile && (
        <Row justify="center">
          <RiMouseLine onClick={handleScroll} className={styles.icon} />
        </Row>
      )}
    </Layout>
  );
}
