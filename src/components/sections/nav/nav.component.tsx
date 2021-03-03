import React, { CSSProperties, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Row, Col, Menu, Button, Drawer, Switch, Typography } from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { RiSunFill, RiMoonFill } from "react-icons/all";

import styles from "./nav.module.css";
import { sections } from "&config/meta";

const { Text } = Typography;
const darkBar = "rgba(0, 0, 0, 0.7)";
const lightBar = "rgba(255, 255, 255, 0.7)";

export function Nav() {
  const collapseWidth = 800;
  const { t, i18n } = useTranslation();
  const { switcher, currentTheme, themes } = useThemeSwitcher();

  const [isDrawerOpen, showDrawer] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(currentTheme === themes.dark);

  /** Toggles between dark and light themes */
  const toggleTheme = (isChecked: boolean) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollWithOffset = (el: Element) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -84;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  const renderBarStyle = () => {
    let barStyle: CSSProperties = {};
    if (scrollPosition > 0) {
      if (scrollPosition > window.innerHeight) {
        barStyle.background = currentTheme === themes.dark ? darkBar : lightBar;
      } else {
        barStyle.zIndex = -1;
      }

      barStyle.top = 0;
      barStyle.position = "fixed";
    } else {
      barStyle.position = "absolute";
    }
    return barStyle;
  };

  const renderMenuContent = () => (
    <>
      {sections.map(({ key, name, href }) => (
        <Menu.Item key={key} className={styles.item}>
          <HashLink scroll={(el) => scrollWithOffset(el)} smooth to={href}>
            {t(name)}
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
    </>
  );

  return (
    <>
      <Row
        className={styles.header}
        justify="space-between"
        align="middle"
        style={renderBarStyle()}
      >
        <Col>
          <HashLink
            scroll={(el) => scrollWithOffset(el)}
            smooth
            to={sections[0]?.href}
          >
            <Text strong style={{ fontSize: 20 }}>
              {t("FULL_NAME")}
            </Text>
          </HashLink>
        </Col>
        <Col>
          {width > collapseWidth ? (
            <Menu mode="horizontal" className={styles.navbar}>
              {renderMenuContent()}
            </Menu>
          ) : (
            <Button onClick={() => showDrawer(true)}>
              <MenuOutlined />
            </Button>
          )}
        </Col>
      </Row>
      <Drawer
        closeIcon={<CloseOutlined />}
        placement="right"
        closable={true}
        onClose={() => showDrawer(false)}
        visible={isDrawerOpen && width <= collapseWidth}
      >
        <Menu mode="vertical" className={styles.drawer}>
          {renderMenuContent()}
        </Menu>
      </Drawer>
    </>
  );
}
