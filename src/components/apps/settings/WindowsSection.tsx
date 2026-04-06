import { useTranslation } from "react-i18next";
import { usePreferences } from "@/hooks";
import { cn } from "@/utils/cn";
import type { AnimationSpeed } from "@/types";

const SPEEDS: AnimationSpeed[] = ["normal", "fast", "off"];

export function WindowsSection() {
  const { t } = useTranslation();
  const { preferences, setAnimationSpeed, setAutoCascade } = usePreferences();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        {t("apps.settings.sections.windows")}
      </h2>

      {/* Animation speed */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          {t("apps.settings.windows.animationSpeed")}
        </label>
        <div className="flex gap-2">
          {SPEEDS.map((speed) => (
            <button
              key={speed}
              onClick={() => setAnimationSpeed(speed)}
              className={cn(
                "flex-1 rounded-lg px-3 py-2 text-sm border transition-colors",
                preferences.animationSpeed === speed
                  ? "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--text-primary)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]",
              )}
            >
              {t(`apps.settings.windows.speeds.${speed}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-cascade toggle */}
      <div className="flex items-center justify-between">
        <label className="text-sm text-[var(--text-secondary)]">
          {t("apps.settings.windows.autoCascade")}
        </label>
        <button
          role="switch"
          aria-checked={preferences.autoCascade}
          onClick={() => setAutoCascade(!preferences.autoCascade)}
          className={cn(
            "relative w-10 h-6 rounded-full transition-colors",
            preferences.autoCascade
              ? "bg-[var(--accent)]"
              : "bg-[var(--text-tertiary)]",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform",
              preferences.autoCascade && "translate-x-4",
            )}
          />
        </button>
      </div>
    </div>
  );
}
