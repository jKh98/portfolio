import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { Row, Col, Menu, Button, Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

import styles from "./nav.module.css";

const sections = require("&config/sections");

export function Nav() {
  const collapseWidth = 800;
  const { t } = useTranslation();

  const [width, setWidth] = useState(window.innerWidth);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDrawerOpen, showDrawer] = useState(false);

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

  const renderMenuContent = () =>
    sections.map((key: string) => (
      <Menu.Item key={key} className={styles.item}>
        <HashLink scroll={(el) => scrollWithOffset(el)} smooth to={`#${key}`}>
          {t(key.toUpperCase())}
        </HashLink>
      </Menu.Item>
    ));

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
                borderBottomLeftRadius: "32px",
                borderBottomRightRadius: "32px",
              }
            : {
                borderTopLeftRadius: "32px",
                borderTopRightRadius: "32px",
              }
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
        <Menu>{renderMenuContent()}</Menu>
      </Drawer>
    </>
  );
}
