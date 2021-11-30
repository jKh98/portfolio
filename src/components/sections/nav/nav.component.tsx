import React, { CSSProperties, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Row, Col, Menu, Drawer, Layout, Switch, Typography } from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { RiSunFill, RiMoonFill } from "react-icons/all";

import styles from "./nav.module.css";
import { sections } from "&config/meta";

const { Text } = Typography;
const { Header } = Layout;

const COLLAPSE_WIDTH = 850;
const NAV_HEIGHT = 60;

export function Nav() {
  const { t, i18n } = useTranslation();
  const { switcher, currentTheme, themes } = useThemeSwitcher();

  const [isDrawerOpen, showDrawer] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [barStyle, setBarStyle] = useState<CSSProperties>({});
  const isDarkMode = currentTheme === themes.dark;

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

  /** Toggles between dark and light themes */
  const toggleTheme = (isChecked: boolean) => {
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  const scrollWithOffset = (el: Element) => {
    const top = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const renderMenuContent = () => (
    <React.Fragment>
      {Object.entries(sections).map(([key, value]) => (
        <Menu.Item key={key} className={styles.item}>
          <HashLink scroll={scrollWithOffset} smooth to={`#${value}`}>
            {t(key)}
          </HashLink>
        </Menu.Item>
      ))}
      <Menu.SubMenu
        key="i18n"
        className={styles.item}
        title={<TranslationOutlined />}
      >
        {i18n.languages.map((lang) => (
          <Menu.Item key={lang} onClick={() => i18n.changeLanguage(lang)}>
            {t(lang.toUpperCase())}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.Item key="theme" className={styles.item}>
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          checkedChildren={<RiMoonFill className={styles.icon} />}
          unCheckedChildren={<RiSunFill className={styles.icon} />}
        />
      </Menu.Item>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Header style={barStyle} className={styles.header}>
        <Row justify="space-between" align="middle">
          <Col>
            <HashLink scroll={scrollWithOffset} smooth to={`#home`}>
              <Text strong style={{ fontSize: 20 }}>
                {t("FULL_NAME")}
              </Text>
            </HashLink>
          </Col>
          <Col>
            {width > COLLAPSE_WIDTH ? (
              <Menu
                mode="horizontal"
                className={styles.navbar}
                selectedKeys={[window.location.hash.replace("#", "")]}
              >
                {renderMenuContent()}
              </Menu>
            ) : (
              <MenuOutlined onClick={() => showDrawer(true)} />
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
        onClose={() => showDrawer(false)}
        visible={isDrawerOpen && width <= COLLAPSE_WIDTH}
      >
        <Menu
          mode="vertical"
          className={styles.drawer}
          selectedKeys={[window.location.hash.replace("#", "")]}
        >
          {renderMenuContent()}
        </Menu>
      </Drawer>
    </React.Fragment>
  );
}
