import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Row, Col, Menu, Button, Drawer, Switch } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

import styles from "./nav.module.css";
import { sections } from "&config/meta";

export function Nav() {
  const collapseWidth = 800;
  const { t } = useTranslation();
  const { switcher, currentTheme, themes } = useThemeSwitcher();

  const [width, setWidth] = useState(window.innerWidth);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDrawerOpen, showDrawer] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(currentTheme === "dark");

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

  const renderMenuContent = () => (
    <>
      {sections.map(({ key, title, href }) => (
        <Menu.Item key={key} className={styles.item}>
          <HashLink scroll={(el) => scrollWithOffset(el)} smooth to={href}>
            {t(title)}
          </HashLink>
        </Menu.Item>
      ))}
      <Menu.Item key="theme" className={styles.item}>
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          checkedChildren={"🌙"}
          unCheckedChildren={"☀️"}
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
        style={
          scrollPosition > 32
            ? {
                position: "fixed",
                top: 0,
              }
            : undefined
        }
      >
        <Col>
          <a href={"#"}>jihad</a>
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
        className={styles.drawer}
        closeIcon={<CloseOutlined />}
        placement="right"
        closable={true}
        onClose={() => showDrawer(false)}
        visible={isDrawerOpen && width <= collapseWidth}
      >
        <Menu mode="vertical">{renderMenuContent()}</Menu>
      </Drawer>
    </>
  );
}
