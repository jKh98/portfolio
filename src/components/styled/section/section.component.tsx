import React, { ReactNode } from "react";
import { Row, Layout, Typography } from "antd";

import styles from "./section.module.css";

interface SectionProps {
  title: string;
  children: ReactNode;
}

const { Title } = Typography;
const { Content } = Layout;

export function Section(props: SectionProps) {
  const { title, children } = props;
  return (
    <Content className={styles.container}>
      <Row justify="center">
        <Title level={2}>{title}</Title>
      </Row>
      {children}
    </Content>
  );
}
