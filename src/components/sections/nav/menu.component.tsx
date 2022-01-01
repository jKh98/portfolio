import React from "react";
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Menu as AntdMenu, Switch } from "antd";
import { TranslationOutlined } from "@ant-design/icons";
import { RiSunFill, RiMoonFill } from "react-icons/all";
import ReactGA from "react-ga";

import styles from "./nav.module.css";
import { sections } from "&config/meta";
import { scroll } from "&utils/scroll";

interface MenuProps {
  mode: "horizontal" | "vertical" | "inline";
  className: string;
  popupClassName?: string;
}

export function Menu(props: MenuProps) {
  const { mode, className, popupClassName } = props;
  const { t, i18n } = useTranslation();
  const { switcher, currentTheme, themes } = useThemeSwitcher();
  const isDarkMode = currentTheme === themes.dark;

  const createLanguageHandler = (lang: string) => () => {
    ReactGA.event({ category: "Language", action: lang });
    i18n.changeLanguage(lang);
  };

  /** Toggles between dark and light themes */
  const toggleTheme = (isChecked: boolean) => {
    const theme = isChecked ? themes.dark : themes.light;
    switcher({ theme });
    localStorage.setItem("theme", theme);
  };

  return (
    <AntdMenu
      mode={mode}
      className={className}
      disabledOverflow
      selectedKeys={[window.location.hash.replace("#", "")]}
    >
      {Object.entries(sections).map(([key, value]) => (
        <AntdMenu.Item key={key} className={styles.item}>
          <HashLink scroll={scroll} smooth to={`#${value}`}>
            {t(key)}
          </HashLink>
        </AntdMenu.Item>
      ))}

      <AntdMenu.SubMenu
        key="i18n"
        className={styles.item}
        popupClassName={popupClassName}
        title={<TranslationOutlined />}
      >
        {i18n.languages.map((lang) => (
          <AntdMenu.Item key={lang} onClick={createLanguageHandler(lang)}>
            {t(lang.toUpperCase())}
          </AntdMenu.Item>
        ))}
      </AntdMenu.SubMenu>

      <AntdMenu.Item key="theme" className={styles.item}>
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          checkedChildren={<RiMoonFill className={styles.icon} />}
          unCheckedChildren={<RiSunFill className={styles.icon} />}
        />
      </AntdMenu.Item>
    </AntdMenu>
  );
}
