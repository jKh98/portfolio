import React from "react";
import { Layout } from "antd";

import { Nav } from "&components/sections/nav/nav.component";
import { Social } from "&components/sections/social/social.component";
import { Home } from "&components/sections/home/home.component";
import { About } from "&components/sections/about/about.component";
import { Github } from "&components/sections/github/github.component";

export function Landing() {
  return (
    <Layout>
      <Nav />
      <Home />
      <About />
      <Github />
      <Social />
    </Layout>
  );
}
