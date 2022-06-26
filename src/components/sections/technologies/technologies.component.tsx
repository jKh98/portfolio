import React from "react";
import { Avatar, Card, Col, List, Row, Typography, Rate } from "antd";
import {
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiJava,
  SiReact,
  SiRedux,
  SiHtml5,
  SiCss3,
  SiSpring,
  SiSpringboot,
  SiCplusplus,
  SiC,
  SiPython,
  SiAndroid,
  SiAmazonaws,
  SiMongodb,
  SiMicrosoftsqlserver,
  SiPostgresql,
  SiJenkins,
  SiKubernetes,
  SiDocker,
  SiFirebase,
  SiGooglecloud,
  //   SiAntdesign,
  //   SiVisualstudiocode,
  //   SiIntellijidea,
} from "react-icons/si";

import styles from "./technologies.module.css";

const { Title } = Typography;

export function Technologies() {
  const lang = [
    { name: "Javascript", icon: <SiJavascript />, url: "", proficiency: 5 },
    { name: "Typescript", icon: <SiTypescript />, url: "", proficiency: 5 },
    { name: "Java", icon: <SiJava />, url: "", proficiency: 4.5 },
    { name: "C++", icon: <SiCplusplus />, url: "", proficiency: 3 },
    { name: "C", icon: <SiC />, url: "", proficiency: 3 },
    { name: "Python", icon: <SiPython />, url: "", proficiency: 3 },
  ];
  const web = [
    { name: "React JS", icon: <SiReact />, url: "", proficiency: 5 },
    { name: "Redux", icon: <SiRedux />, url: "", proficiency: 5 },
    { name: "HTML5", icon: <SiHtml5 />, url: "", proficiency: 4.5 },
    { name: "CSS3", icon: <SiCss3 />, url: "", proficiency: 4 },
  ];
  const mobile = [
    { name: "React Native", icon: <SiReact />, url: "", proficiency: 4 },
    { name: "Android", icon: <SiAndroid />, url: "", proficiency: 3.5 },
  ];
  const backend = [
    { name: "Node JS", icon: <SiNodedotjs />, url: "", proficiency: 5 },
    { name: "Express", icon: <SiExpress />, url: "", proficiency: 5 },
    { name: "Spring", icon: <SiSpring />, url: "", proficiency: 4 },
    { name: "Spring Boot", icon: <SiSpringboot />, url: "", proficiency: 4 },
  ];
  const db = [
    { name: "Mongodb", icon: <SiMongodb />, url: "", proficiency: 4 },
    {
      name: "MS SQL",
      icon: <SiMicrosoftsqlserver />,
      url: "",
      proficiency: 3.5,
    },
    { name: "PostgreSQL", icon: <SiPostgresql />, url: "", proficiency: 3 },
  ];
  const devops = [
    { name: "Amazon AWS", icon: <SiAmazonaws />, url: "", proficiency: 4 },
    { name: "Jenkins", icon: <SiJenkins />, url: "", proficiency: 4.5 },
    { name: "Kubernetes", icon: <SiKubernetes />, url: "", proficiency: 2.5 },
    { name: "Docker", icon: <SiDocker />, url: "", proficiency: 2.5 },
  ];
  const services = [
    { name: "Firebase", icon: <SiFirebase />, url: "", proficiency: 4.5 },
    {
      name: "Google Cloud APIs",
      icon: <SiGooglecloud />,
      url: "",
      proficiency: 4,
    },
  ];

  const groups = [lang, web, mobile, backend, db, devops, services];

  const goToPage = (url: string) => window.open(url, "_blank")?.focus();

  return (
    <Row justify="center">
      <Col flex={1}>
        {groups.map((group, i) => (
          <List
            key={i}
            grid={{ gutter: 16, xs: 1, sm: 1, md: 3, lg: 4, xl: 6, xxl: 6 }}
            dataSource={group}
            renderItem={({ name, icon, url, proficiency }, ii) => (
              <Card
                key={ii}
                hoverable
                className={styles.card}
                bordered={false}
                onClick={() => goToPage(url)}
              >
                <Avatar size={75} icon={icon} className={styles.icon} />
                <Title level={3}>{name}</Title>
                <Rate
                  allowHalf
                  disabled
                  defaultValue={proficiency}
                  style={{ color: "hsl(162, 100%, 58%)" }}
                />
              </Card>
            )}
          />
        ))}
      </Col>
    </Row>
  );
}
