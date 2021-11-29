import React, { ReactNode } from "react";
import { Row, Layout, Typography } from "antd";
import Texty from "rc-texty";

import styles from "./section.module.css";
import { OverPack } from "rc-scroll-anim";

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
      <Row justify="center" style={{ minHeight: "86px" }}>
        <Title level={1}>
          <OverPack>
            <Texty type={"scale"} mode={"smooth"}>
              {title}
            </Texty>
          </OverPack>
        </Title>
      </Row>

      {children}
    </Content>
  );
}
