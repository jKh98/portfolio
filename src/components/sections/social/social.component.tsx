import React from "react";
import { Row } from "antd";
import {
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiTwitterLine,
  RiGithubLine,
} from "react-icons/ri";

import styles from "./social.module.css";
import { social } from "&config/meta";

export function Social() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
