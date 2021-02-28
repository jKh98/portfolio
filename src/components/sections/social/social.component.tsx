import React from "react";
import { Layout, Row } from "antd";
import {
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiTwitterLine,
  RiGithubLine,
} from "react-icons/all";

import styles from "./social.module.css";
import { social } from "&config/meta";

const { Footer } = Layout;

export function Social() {
  return (
    <Footer>
      <Row justify="center">
        <a href={social.github}>
          <RiGithubLine className={styles.icon} />
        </a>
        <a href={social.linkedIn}>
          <RiLinkedinLine className={styles.icon} />
        </a>
        <a href={social.twitter}>
          <RiTwitterLine className={styles.icon} />
        </a>
        <a href={social.facebook}>
          <RiFacebookLine className={styles.icon} />
        </a>
        <a href={social.instagram}>
          <RiInstagramLine className={styles.icon} />
        </a>
      </Row>
    </Footer>
  );
}
