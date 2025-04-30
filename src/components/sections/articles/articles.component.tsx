import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Row, Col, Card, Layout, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import { Parallax } from "rc-scroll-anim";
import ReactGA from "react-ga";

import { Section } from "&components/common/section/section.component";
import {
  mediumURL,
  mediumUser,
  mediumFeedURL,
  rssToJsonServiceURL,
} from "&config/meta";
import styles from "./articles.module.css";
import { useThemeSwitcher } from "react-css-theme-switcher";

interface Article {
  author: string;
  categories: string[];
  content: string;
  description: string;
  enclosure: object;
  guid: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  title: string;
}

export function Articles() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const { currentTheme, themes } = useThemeSwitcher();

  useEffect(() => {
    fetch(`${rssToJsonServiceURL}?rss_url=${mediumFeedURL}/${mediumUser}`)
      .then((data) => data.json())
      .then(({ items }) => setArticles(items));
  }, []);

  console.log(articles);

  const createMediumLinkHandler = (link: string) => () => {
    ReactGA.event({ category: "Medium", action: "Click", label: link });
    window.open(link, "_blank");
  };

  return (
    <Layout
      className={styles.full}
      style={{
        background: currentTheme === themes.light ? "white" : "transparent",
      }}
    >
      <Section full title={t("ARTICLES")}>
        <Row justify="space-between">
          {articles.map(({ guid, link, title, content, pubDate }) => (
            <Col key={guid} xs={24} sm={11} md={11} lg={7}>
              <Parallax
                animation={{ x: 0, opacity: 1, playScale: [0.2, 0.55] }}
                style={{ transform: "translateX(-100px)", opacity: 0 }}
              >
                <Card
                  hoverable
                  className={styles.card}
                  onClick={createMediumLinkHandler(link)}
                  style={{
                    backgroundColor:
                      currentTheme === themes.light ? "#cce6ff" : "#0d1a26",
                  }}
                  cover={
                    <img
                      alt={title}
                      src={
                        content.match(/<img[^>]+src="([^">]+)"/)?.[1] ||
                        "https://via.placeholder.com/150"
                      }
                      className={styles.img}
                    />
                  }
                >
                  <Meta
                    title={title}
                    description={moment(pubDate).format("DD-MM-YYYY")}
                  />
                </Card>
              </Parallax>
            </Col>
          ))}
        </Row>
        <br />
        <Row justify="center">
          <Button
            type="primary"
            size="large"
            onClick={createMediumLinkHandler(`${mediumURL}/${mediumUser}`)}
          >
            {t("CHECK_ARTICLES")}
          </Button>
        </Row>
      </Section>
    </Layout>
  );
}
