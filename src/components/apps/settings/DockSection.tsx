import { useTranslation } from "react-i18next";
import { usePreferences } from "@/hooks";
import { cn } from "@/utils/cn";
import type { DockIconSize } from "@/types";

const ICON_SIZES: DockIconSize[] = ["small", "medium", "large"];

export function DockSection() {
  const { t } = useTranslation();
  const { preferences, setDockMagnification, setDockIconSize } =
    usePreferences();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        {t("apps.settings.sections.dock")}
      </h2>

      {/* Magnification toggle */}
      <div className="flex items-center justify-between">
        <label className="text-sm text-[var(--text-secondary)]">
          {t("apps.settings.dock.magnification")}
        </label>
        <button
          role="switch"
          aria-checked={preferences.dockMagnification}
          onClick={() => setDockMagnification(!preferences.dockMagnification)}
          className={cn(
            "relative w-10 h-6 rounded-full transition-colors",
            preferences.dockMagnification
              ? "bg-[var(--accent)]"
              : "bg-[var(--text-tertiary)]",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform",
              preferences.dockMagnification && "translate-x-4",
            )}
          />
        </button>
      </div>

      {/* Icon size */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          {t("apps.settings.dock.iconSize")}
        </label>
        <div className="flex gap-2">
          {ICON_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setDockIconSize(size)}
              className={cn(
                "flex-1 rounded-lg px-3 py-2 text-sm border transition-colors",
                preferences.dockIconSize === size
                  ? "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--text-primary)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]",
              )}
            >
              {t(`apps.settings.dock.sizes.${size}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
