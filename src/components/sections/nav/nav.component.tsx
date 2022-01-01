import React, { CSSProperties, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Row, Col, Drawer, Layout, Typography } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import ReactGA from "react-ga";

import styles from "./nav.module.css";
import { Menu } from "./menu.component";
import { scroll } from "&utils/scroll";

const { Text } = Typography;
const { Header } = Layout;

const COLLAPSE_WIDTH = 850;
const NAV_HEIGHT = 60;

export function Nav() {
  const { t } = useTranslation();
  const { currentTheme, themes } = useThemeSwitcher();

  const [isDrawerOpen, showDrawer] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [barStyle, setBarStyle] = useState<CSSProperties>({});
  const isDarkMode = currentTheme === themes.dark;

  const onDrawerOpen = () => {
    ReactGA.event({ category: "Navigation", action: "Drawer Open" });
    showDrawer(true);
  };

  const onDrawerClose = () => {
    ReactGA.event({ category: "Navigation", action: "Drawer Close" });
    showDrawer(false);
  };

  // Fix instagram window.innerwidth issue
  useEffect(() => {
    if (window.screen.width < window.innerWidth) {
      setWidth(window.screen.width);
    }
  }, []);

  /** Handles window resize events */
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** Handles scroll events */
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let newBarStyle: CSSProperties = {};

    if (scrollPosition > 0) {
      if (scrollPosition + NAV_HEIGHT > window.innerHeight) {
        if (!isDarkMode) {
          newBarStyle.boxShadow = "0 0 10px";
        }
      } else {
        newBarStyle.zIndex = -1;
      }

      newBarStyle.top = 0;
      newBarStyle.position = "fixed";
    } else {
      newBarStyle.position = "absolute";
      newBarStyle.backgroundColor = "transparent";
    }

    setBarStyle(newBarStyle);
  }, [scrollPosition, isDarkMode]);

  return (
    <React.Fragment>
      <Header style={barStyle} className={styles.header}>
        <Row justify="space-between" align="middle">
          <Col>
            <HashLink scroll={scroll} smooth to={`#home`}>
              <Text strong style={{ fontSize: 20 }}>
                {t("FULL_NAME")}
              </Text>
            </HashLink>
          </Col>
          <Col>
            {width > COLLAPSE_WIDTH ? (
              <Menu mode="horizontal" className={styles.navbar} />
            ) : (
              <MenuOutlined onClick={onDrawerOpen} />
            )}
          </Col>
        </Row>
      </Header>
      <Drawer
        closeIcon={<CloseOutlined />}
        placement="right"
        width={"100vw"}
        closable={true}
        className={styles.drawer}
        onClose={onDrawerClose}
        visible={isDrawerOpen && width <= COLLAPSE_WIDTH}
      >
        <Menu
          mode="vertical"
          className={styles.drawer}
          popupClassName={styles.submenu}
        />
      </Drawer>
    </React.Fragment>
  );
}
