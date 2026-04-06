import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Languages, Search } from "lucide-react";
import { cn } from "@/utils/cn";
import { useTheme } from "@/context";
import { useIsMobile } from "@/hooks";
import { IconButton } from "@/components/ui";
import { trackEvent, setUserProps } from "@/lib/analytics";
import { BrandingMenu } from "./BrandingMenu";
import { AppMenu } from "./AppMenu";

export interface TopBarProps {
  onSpotlightOpen?: () => void;
  onRestart?: () => void;
}

export function TopBar({ onSpotlightOpen, onRestart }: TopBarProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [time, setTime] = useState(() => formatTime());

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime()), 1_000);
    return () => clearInterval(interval);
  }, []);

  const toggleLanguage = () => {
    const next = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(next);
    trackEvent("language_toggle", { language: next });
    setUserProps({ language: next });
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 h-8",
        "flex items-center justify-between",
        "backdrop-blur-2xl backdrop-saturate-150 border-b",
        "bg-[var(--bg-glass)] border-[var(--border)]",
        "shadow-[var(--shadow-topbar)]",
        "text-xs select-none",
        isMobile ? "px-2" : "px-4",
      )}
    >
      {/* Start: Branding + App menus */}
      <div className="flex items-center gap-2 min-w-0">
        <BrandingMenu onRestart={onRestart} />
        {!isMobile && <AppMenu />}
      </div>

      {/* Center: Clock */}
      <span
        className={cn(
          "absolute left-1/2 -translate-x-1/2",
          "text-[var(--text-secondary)] font-mono glass-text-shadow",
          isMobile && "text-[10px]",
        )}
      >
        {time}
      </span>

      {/* End: Spotlight + Theme + Language toggles */}
      <div className="flex items-center gap-1">
        {onSpotlightOpen && (
          <IconButton
            label={t("topbar.spotlight.placeholder")}
            size="sm"
            onClick={onSpotlightOpen}
          >
            <Search size={14} />
          </IconButton>
        )}
        <IconButton
          label={t("topbar.switchTheme")}
          size="sm"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </IconButton>
        <IconButton
          label={t("topbar.switchLanguage")}
          size="sm"
          onClick={toggleLanguage}
        >
          <Languages size={14} />
        </IconButton>
      </div>
    </header>
  );
}

function formatTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
