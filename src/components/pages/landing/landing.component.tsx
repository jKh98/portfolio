import React from "react";
import { Layout } from "antd";
// @ts-ignore
import { Scrollama, Step } from "react-scrollama";

import { Nav } from "&components/sections/nav/nav.component";
import { Social } from "&components/sections/social/social.component";
import { Home } from "&components/sections/home/home.component";
import { Overview } from "&components/sections/overview/overview.component";
import { Github } from "&components/sections/github/github.component";
import { Experience } from "&components/sections/experience/experience.component";
import { Education } from "&components/sections/education/education.component";
import { sections } from "&config/meta";

export function Landing() {
  const setSection = ({ data }: { data: string }) => {
    window.history.replaceState(null, "", `#${data}`);
  };

  return (
    <Layout>
      <Nav />
      <Scrollama onStepEnter={setSection}>
        <Step data={"home"}>
          <div>
            <Layout id={"home"}>
              <Home />
            </Layout>
          </div>
        </Step>
        <Step data={sections[0].key}>
          <div>
            <Layout id={sections[0].key}>
              <Overview />
              <Experience />
              <Education />
            </Layout>
          </div>
        </Step>
        <Step data={"footer"}>
          <div>
            <Layout id={"footer"}>
              <Github />
              <Social />
            </Layout>
          </div>
        </Step>
      </Scrollama>
    </Layout>
  );
}
