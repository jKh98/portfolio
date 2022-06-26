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
import { Parallax } from "rc-scroll-anim";

import styles from "./technologies.module.css";

const { Title } = Typography;

export function Technologies() {
  const lang = [
    {
      name: "Javascript",
      icon: <SiJavascript />,
      url: "https://www.javascript.com/",
      proficiency: 5,
    },
    {
      name: "Typescript",
      icon: <SiTypescript />,
      url: "https://www.typescriptlang.org/",
      proficiency: 5,
    },
    {
      name: "Java",
      icon: <SiJava />,
      url: "https://www.java.com/en/",
      proficiency: 4.5,
    },
    {
      name: "C++",
      icon: <SiCplusplus />,
      url: "https://en.cppreference.com/w/",
      proficiency: 3,
    },
    {
      name: "Python",
      icon: <SiPython />,
      url: "https://www.python.org/",
      proficiency: 3,
    },
  ];
  const web = [
    {
      name: "React JS",
      icon: <SiReact />,
      url: "https://reactjs.org/",
      proficiency: 5,
    },
    {
      name: "Redux",
      icon: <SiRedux />,
      url: "https://redux.js.org/",
      proficiency: 5,
    },
    {
      name: "HTML5",
      icon: <SiHtml5 />,
      url: "https://html.spec.whatwg.org/multipage/",
      proficiency: 4.5,
    },
    {
      name: "CSS3",
      icon: <SiCss3 />,
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      proficiency: 4,
    },
  ];
  const mobile = [
    {
      name: "React Native",
      icon: <SiReact />,
      url: "https://reactnative.dev/",
      proficiency: 4,
    },
    {
      name: "Android SDK",
      icon: <SiAndroid />,
      url: "https://developer.android.com/",
      proficiency: 3.5,
    },
  ];
  const backend = [
    {
      name: "Node JS",
      icon: <SiNodedotjs />,
      url: "https://nodejs.org/",
      proficiency: 5,
    },
    {
      name: "Express JS",
      icon: <SiExpress />,
      url: "https://expressjs.com/",
      proficiency: 5,
    },
    {
      name: "Spring",
      icon: <SiSpring />,
      url: "https://spring.io/",
      proficiency: 4,
    },
    {
      name: "Spring Boot",
      icon: <SiSpringboot />,
      url: "https://spring.io/projects/spring-boot",
      proficiency: 4,
    },
  ];
  const db = [
    {
      name: "Mongodb",
      icon: <SiMongodb />,
      url: "https://www.mongodb.com/",
      proficiency: 4,
    },
    {
      name: "MS SQL",
      icon: <SiMicrosoftsqlserver />,
      url: "https://docs.microsoft.com/en-us/sql/",
      proficiency: 3.5,
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql />,
      url: "https://www.postgresql.org/docs/",
      proficiency: 3,
    },
  ];
  const devops = [
    {
      name: "Amazon AWS",
      icon: <SiAmazonaws />,
      url: "https://aws.amazon.com/",
      proficiency: 4,
    },
    {
      name: "Jenkins",
      icon: <SiJenkins />,
      url: "https://www.jenkins.io/",
      proficiency: 4.5,
    },
    {
      name: "Kubernetes",
      icon: <SiKubernetes />,
      url: "https://kubernetes.io/",
      proficiency: 2.5,
    },
    {
      name: "Docker",
      icon: <SiDocker />,
      url: "https://www.docker.com/",
      proficiency: 2.5,
    },
  ];
  const services = [
    {
      name: "Firebase",
      icon: <SiFirebase />,
      url: "https://firebase.google.com/",
      proficiency: 4.5,
    },
    {
      name: "Google Cloud APIs",
      icon: <SiGooglecloud />,
      url: "https://cloud.google.com/apis",
      proficiency: 4,
    },
  ];

  const groups = [
    { name: "Langs", data: lang },
    { name: "web", data: web },
    { name: "mobile", data: mobile },
    { name: "backend", data: backend },
    { name: "db", data: db },
    { name: "devops", data: devops },
    { name: "services", data: services },
  ];

  const goToPage = (url: string) => window.open(url, "_blank")?.focus();

  return (
    <Row justify="center">
      <Col flex={1}>
        <List
          size="large"
          dataSource={groups}
          renderItem={(group, i) => (
            <Parallax
              key={i}
              animation={{ x: 0, opacity: 1, playScale: [0.2, 0.55] }}
              style={{ transform: "translateX(-100px)", opacity: 0 }}
            >
              <Card title={group.name} size="small">
                <List
                  size="small"
                  grid={{
                    gutter: 16,
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 5,
                    xl: 6,
                    xxl: 8,
                  }}
                  dataSource={group.data}
                  renderItem={({ name, icon, url, proficiency }, ii) => (
                    <Card
                      key={ii}
                      className={styles.card}
                      bordered={false}
                      size="small"
                      onClick={() => goToPage(url)}
                    >
                      <Avatar size={52} icon={icon} className={styles.icon} />
                      <Title level={5}>{name}</Title>
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={proficiency}
                        style={{
                          color: "hsl(162, 100%, 58%)",
                          fontSize: "small",
                        }}
                      />
                    </Card>
                  )}
                />
              </Card>
              <br />
            </Parallax>
          )}
        />
      </Col>
    </Row>
  );
}
