import React, { ReactNode } from "react";
import { Row, Layout, Typography } from "antd";

import styles from "./section.module.css";

interface SectionProps {
  title?: string;
  full?: boolean;
  children: ReactNode;
}

const { Title } = Typography;
const { Content } = Layout;

export function Section(props: SectionProps) {
  const { title, full = false, children } = props;
  return (
    <Content
      style={{ minHeight: full ? "100vh" : "auto" }}
      className={styles.container}
    >
      <Row justify="center" className={styles.title}>
        <Title level={1}>{title}</Title>
      </Row>

      {children}
    </Content>
  );
}
