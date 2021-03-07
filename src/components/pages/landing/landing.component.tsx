import React from "react";
import { Layout } from "antd";

import { Nav } from "&components/sections/nav/nav.component";
import { Social } from "&components/sections/social/social.component";
import { Home } from "&components/sections/home/home.component";
import { Overview } from "&components/sections/overview/overview.component";
import { Github } from "&components/sections/github/github.component";
import { Experience } from "&components/sections/experience/experience.component";
import { sections } from "&config/meta";

export function Landing() {
  return (
    <Layout>
      <Nav />
      <Layout id={"home"}>
        <Home />
      </Layout>
      <Layout id={sections[0].key}>
        <Overview />
        <Experience />
      </Layout>
      <Github />
      <Social />
    </Layout>
  );
}
