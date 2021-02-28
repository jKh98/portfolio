import React from "react";
import { Layout } from "antd";

import { Nav } from "&components/sections/nav/nav.component";
import { Social } from "&components/sections/social/social.component";
import { About } from "&components/sections/about/about.component";

export function Landing() {
  return (
    <Layout>
      <Nav />
      <About />
      <Social />
    </Layout>
  );
}
