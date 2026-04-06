import { useTranslation } from "react-i18next";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useTheme } from "@/context";
import { usePreferences } from "@/hooks";
import { ACCENT_COLORS } from "@/constants";
import { cn } from "@/utils/cn";
import type { AccentColor } from "@/types";

const ACCENT_IDS: AccentColor[] = ["cyan", "purple", "green", "amber", "rose"];

export function AppearanceSection() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { preferences, setAccentColor } = usePreferences();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        {t("apps.settings.sections.appearance")}
      </h2>

      {/* Theme toggle */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          {t("apps.settings.appearance.theme")}
        </label>
        <div className="flex gap-2">
          {(["light", "dark"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setTheme(mode)}
              className={cn(
                "flex-1 rounded-lg px-4 py-3 text-sm border transition-colors",
                theme === mode
                  ? "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--text-primary)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]",
              )}
            >
              {mode === "dark" ? (
                <Moon className="me-2 inline-block h-4 w-4" aria-hidden="true" />
              ) : (
                <Sun className="me-2 inline-block h-4 w-4" aria-hidden="true" />
              )}
              {t(`apps.settings.appearance.${mode}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Accent color picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          {t("apps.settings.appearance.accentColor")}
        </label>
        <div className="flex gap-3">
          {ACCENT_IDS.map((id) => {
            const preset = ACCENT_COLORS[id];
            return (
              <button
                key={id}
                onClick={() => setAccentColor(id)}
                aria-label={t(`apps.settings.appearance.colors.${id}`)}
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-transform",
                  "hover:scale-110",
                  preferences.accentColor === id
                    ? "border-[var(--text-primary)] scale-110"
                    : "border-transparent",
                )}
                style={{ backgroundColor: preset.value }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
