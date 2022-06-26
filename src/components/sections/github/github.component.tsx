import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Card, Col } from "antd";
import ReactGithubCalender from "react-github-calendar";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Parallax } from "rc-scroll-anim";

import { githubUser } from "&config/meta";
import { githubDark, githubLight } from "&config/color";

export function Github() {
  const { t } = useTranslation();
  const { currentTheme, themes } = useThemeSwitcher();

  return (
    <Row justify="center">
      <Col>
        <Parallax
          animation={[{ opacity: 1, playScale: [0, 0.45] }]}
          style={{ opacity: 0 }}
        >
          <Card>
            <ReactGithubCalender
              username={githubUser}
              fontSize={16}
              blockMargin={4}
              theme={currentTheme === themes.dark ? githubDark : githubLight}
            />
          </Card>
          <br />
        </Parallax>
      </Col>
    </Row>
  );
}
