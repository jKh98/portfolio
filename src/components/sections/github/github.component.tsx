import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Card } from "antd";
import ReactGithubCalender from "react-github-calendar";
import { useThemeSwitcher } from "react-css-theme-switcher";

import { githubUser } from "&config/meta";
import { githubDark, githubLight } from "&config/color";
import { Section } from "&components/common/section/section.component";

export function Github() {
  const { t } = useTranslation();
  const { currentTheme, themes } = useThemeSwitcher();

  return (
    <Section full={false} title={t("GITHUB_HEADING")}>
      <Row justify="center">
        <Card>
          <ReactGithubCalender
            username={githubUser}
            fontSize={16}
            blockMargin={4}
            theme={currentTheme === themes.dark ? githubDark : githubLight}
          />
        </Card>
      </Row>
    </Section>
  );
}
