import { useTranslation } from "react-i18next";
import { usePreferences } from "@/hooks";
import { cn } from "@/utils/cn";
import { ToggleSwitch } from "@/components/ui";
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
                "flex-1 rounded-lg px-3 py-2 text-sm border transition-colors cursor-pointer",
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
        <ToggleSwitch
          checked={preferences.autoCascade}
          onChange={(v) => setAutoCascade(v)}
        />
      </div>
    </div>
  );
}
