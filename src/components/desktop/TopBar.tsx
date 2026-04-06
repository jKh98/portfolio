import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Languages } from "lucide-react";
import { cn } from "@/utils/cn";
import { useTheme } from "@/context";
import { IconButton } from "@/components/ui";

export function TopBar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [time, setTime] = useState(() => formatTime());

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const toggleLanguage = () => {
    const next = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(next);
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 h-8",
        "flex items-center justify-between px-4",
        "backdrop-blur-md border-b",
        "bg-[var(--bg-glass)] border-[var(--border)]",
        "text-xs select-none",
      )}
    >
      {/* Left: Owner name */}
      <span className="font-semibold text-[var(--text-primary)] truncate">
        {t("topbar.name")}
      </span>

      {/* Center: Clock */}
      <span className="absolute left-1/2 -translate-x-1/2 text-[var(--text-secondary)] font-mono">
        {time}
      </span>

      {/* Right: Theme + Language toggles */}
      <div className="flex items-center gap-1">
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
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
