import React from "react";
import { BackTop, Layout } from "antd";
// @ts-ignore
import { Scrollama, Step } from "react-scrollama";

import { Nav } from "&components/sections/nav/nav.component";
import { Social } from "&components/sections/social/social.component";
import { Home } from "&components/sections/home/home.component";
import { Overview } from "&components/sections/overview/overview.component";
import { Github } from "&components/sections/github/github.component";
import { About } from "&components/sections/about/about.component";
import { sections } from "&config/meta";
import { Articles } from "&components/sections/articles/articles.component";

const { Footer } = Layout;

export function Landing() {
  const setSection = ({ data }: { data: string }) => {
    window.history.replaceState(null, "", `#${data}`);
  };

  return (
    <Layout>
      <BackTop />
      <Nav />
      <Scrollama onStepEnter={setSection}>
        <Step data={"home"}>
          <div>
            <Layout id={"home"}>
              <Home />
            </Layout>
          </div>
        </Step>
        <Step data={sections.OVERVIEW}>
          <div>
            <Layout id={sections.OVERVIEW}>
              <Overview />
            </Layout>
          </div>
        </Step>
        <Step data={sections.ARTICLES}>
          <div>
            <Layout id={sections.ARTICLES}>
              <Articles />
            </Layout>
          </div>
        </Step>
        <Step data={sections.ABOUT}>
          <div>
            <Layout id={sections.ABOUT}>
              <About />
            </Layout>
          </div>
        </Step>

        <Step data={"footer"}>
          <div>
            <Footer id={"footer"}>
              <Github />
              <Social />
            </Footer>
          </div>
        </Step>
      </Scrollama>
    </Layout>
  );
}
