import React from "react";
import { RiMouseLine } from "react-icons/all";
import { useTranslation } from "react-i18next";
import { Col, Layout, Row, Typography } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Parallax } from "rc-scroll-anim";

import styles from "./home.module.css";
import Profile from "&assets/images/profile.jpg";

const { Title } = Typography;

export function Home() {
  const { currentTheme, themes } = useThemeSwitcher();
  const { t } = useTranslation();

  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const renderProfileStyle = () =>
    currentTheme === themes.light ? { boxShadow: "0 0 10px" } : {};

  return (
    <Layout className={styles.full}>
      <Row justify="space-around" align="middle" className={styles.full}>
        <Parallax
          animation={[{ blur: "10px", playScale: [0.9] }]}
          style={{ filter: "blur(0px)" }}
        >
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
          </Col>
        </Parallax>
      </Row>
      <RiMouseLine onClick={handleScroll} className={styles.icon} />
    </Layout>
  );
}
