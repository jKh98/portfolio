import React from "react";
import { Row, Card, Col } from "antd";
import ReactGithubCalender from "react-github-calendar";
import { Parallax } from "rc-scroll-anim";

import { githubUser } from "&config/meta";

export function Github() {
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
              theme={{
                light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                dark: ["#6f6c6c", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
              }}
            />
          </Card>
          <br />
        </Parallax>
      </Col>
    </Row>
  );
}
