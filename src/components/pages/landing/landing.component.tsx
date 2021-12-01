import React from "react";
import { BackTop, Layout } from "antd";
// @ts-ignore
import { Scrollama, Step } from "react-scrollama";

import { Nav } from "&components/sections/nav/nav.component";
import { Home } from "&components/sections/home/home.component";
import { Overview } from "&components/sections/overview/overview.component";
import { Github } from "&components/sections/github/github.component";
import { About } from "&components/sections/about/about.component";
import { sections } from "&config/meta";
import { Articles } from "&components/sections/articles/articles.component";
import { Contact } from "&components/sections/contact/contact.component";

export function Landing() {
  const setSection = ({ data }: { data: string }) => {
    window.history.replaceState(null, "", `#${data}`);
  };

  return (
    <Layout>
      <BackTop />
      <Nav />
      <Scrollama offset={0.1} onStepEnter={setSection}>
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
              <Github />
            </Layout>
          </div>
        </Step>
        <Step data={sections.CONTACT}>
          <div>
            <Layout id={sections.CONTACT}>
              <Contact />
            </Layout>
          </div>
        </Step>
      </Scrollama>
    </Layout>
  );
}
