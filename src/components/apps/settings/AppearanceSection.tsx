import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Moon, Sun, Check, Link } from "lucide-react";
import { useTheme } from "@/context";
import { usePreferences } from "@/hooks";
import {
  ACCENT_COLORS,
  WALLPAPER_CATEGORIES,
  getWallpapersByCategoryAndTheme,
  getWallpaper,
} from "@/constants";
import type { WallpaperCategory, WallpaperEntry } from "@/constants";
import { cn } from "@/utils/cn";
import type { AccentColor } from "@/types";

const ACCENT_IDS: AccentColor[] = [
  "blue",
  "cyan",
  "teal",
  "green",
  "amber",
  "orange",
  "red",
  "rose",
  "pink",
  "purple",
  "indigo",
];

/** Renders a thumbnail for a wallpaper entry */
function WallpaperThumbnail({
  entry,
  isActive,
  isPaired,
  onClick,
}: {
  entry: WallpaperEntry;
  isActive: boolean;
  /** True when this wallpaper has a light/dark pair */
  isPaired: boolean;
  onClick: () => void;
}) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      aria-label={t(`apps.settings.appearance.wallpapers.${entry.id}`, entry.id)}
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-lg border-2 transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        isActive
          ? "border-[var(--accent)] ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--bg-surface)]"
          : "border-[var(--border)] hover:border-[var(--accent)]/50",
      )}
    >
      {/* Image / CSS preview */}
      {entry.css ? (
        <div className="h-full w-full" style={{ background: entry.css }} />
      ) : (
        <img
          src={entry.thumbnail}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      )}

      {/* Active checkmark */}
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="rounded-full bg-[var(--accent)] p-1">
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
        </div>
      )}

      {/* Pair indicator — shows this wallpaper auto-swaps on theme toggle */}
      {isPaired && (
        <div
          className={cn(
            "absolute top-1 end-1 rounded-full p-0.5",
            "bg-black/40 text-white/80",
            "opacity-0 group-hover:opacity-100 transition-opacity",
            isActive && "opacity-100",
          )}
          title={t("apps.settings.appearance.pairedWallpaper", "Auto-swaps on theme change")}
        >
          <Link className="h-2.5 w-2.5" />
        </div>
      )}
    </button>
  );
}

export function AppearanceSection() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { preferences, setAccentColor, setWallpaper } = usePreferences();

  const [activeCategory, setActiveCategory] = useState<WallpaperCategory>(
    () => getWallpaper(preferences.wallpaper).category,
  );

  const wallpapersInCategory = getWallpapersByCategoryAndTheme(
    activeCategory,
    theme,
  );

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
        <div className="flex flex-wrap gap-3">
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

      {/* Wallpaper picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          {t("apps.settings.appearance.wallpaper")}
        </label>

        {/* Category tabs */}
        <div className="flex gap-1 overflow-x-auto rounded-lg bg-[var(--bg-primary)] p-1">
          {WALLPAPER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeCategory === cat
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass-hover)]",
              )}
            >
              {t(`apps.settings.appearance.wallpaperCategories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Wallpaper grid */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {wallpapersInCategory.map((entry) => (
            <WallpaperThumbnail
              key={entry.id}
              entry={entry}
              isActive={preferences.wallpaper === entry.id}
              isPaired={!!entry.pairId}
              onClick={() => setWallpaper(entry.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
