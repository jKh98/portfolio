import { useTranslation } from "react-i18next";
import { usePreferences } from "@/hooks";
import { cn } from "@/utils/cn";
import type { FontSize } from "@/types";

const FONT_SIZES: FontSize[] = ["small", "normal", "large"];

export function AccessibilitySection() {
  const { t } = useTranslation();
  const { preferences, setReduceMotion, setFontSize } = usePreferences();

  const motionEnabled = preferences.reduceMotion === null
    ? false
    : preferences.reduceMotion;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        {t("apps.settings.sections.accessibility")}
      </h2>

      {/* Reduce motion toggle */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm text-[var(--text-secondary)]">
            {t("apps.settings.accessibility.reduceMotion")}
          </label>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
            {t("apps.settings.accessibility.reduceMotionDesc")}
          </p>
        </div>
        <button
          role="switch"
          aria-checked={motionEnabled}
          onClick={() =>
            setReduceMotion(preferences.reduceMotion === true ? null : true)
          }
          className={cn(
            "relative w-10 h-6 rounded-full transition-colors shrink-0 ms-4",
            motionEnabled
              ? "bg-[var(--accent)]"
              : "bg-[var(--text-tertiary)]",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform",
              motionEnabled && "translate-x-4",
            )}
          />
        </button>
      </div>

      {/* Font size */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          {t("apps.settings.accessibility.fontSize")}
        </label>
        <div className="flex gap-2">
          {FONT_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={cn(
                "flex-1 rounded-lg px-3 py-2 text-sm border transition-colors",
                preferences.fontSize === size
                  ? "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--text-primary)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]",
              )}
            >
              {t(`apps.settings.accessibility.fontSizes.${size}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
