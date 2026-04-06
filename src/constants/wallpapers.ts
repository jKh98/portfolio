/** Wallpaper category identifiers */
export type WallpaperCategory = "abstract" | "nature" | "city" | "minimal";

/** All wallpaper category IDs in display order */
export const WALLPAPER_CATEGORIES: WallpaperCategory[] = [
  "abstract",
  "nature",
  "city",
  "minimal",
];

/** Which theme a wallpaper is designed for */
export type WallpaperTheme = "light" | "dark";

/** Metadata for a single wallpaper option */
export interface WallpaperEntry {
  /** Unique identifier stored in preferences */
  id: string;
  /** Category this wallpaper belongs to */
  category: WallpaperCategory;
  /** Path to full-resolution image (relative to public/) */
  src: string;
  /** Path to thumbnail image */
  thumbnail: string;
  /**
   * CSS-only wallpaper (no image file).
   * When set, `src` is ignored and this CSS value is used as `background`.
   */
  css?: string;
  /** Which UI theme this wallpaper is designed for. */
  theme: WallpaperTheme;
  /**
   * The ID of this wallpaper's counterpart for the opposite theme.
   * Every wallpaper MUST have a pair — strict 1:1 mapping.
   */
  pairId: string;
}

// ── Pair definitions ──────────────────────────────────────────
// 12 pairs = 24 wallpapers (12 light + 12 dark)
//
// | # | Category | Light ID              | Dark ID              |
// |---|----------|-----------------------|----------------------|
// | 1 | abstract | abstract-light-1      | abstract-dark-2      |
// | 2 | abstract | abstract-light-2      | abstract-dark-1      |
// | 3 | abstract | abstract-light-3      | abstract-dark-3      |
// | 4 | nature   | nature-light-1        | nature-dark-1        |
// | 5 | nature   | nature-light-2        | nature-dark-2        |
// | 6 | nature   | nature-light-3        | nature-dark-3        |
// | 7 | city     | city-light-1          | city-dark-1          |
// | 8 | city     | city-light-2          | city-dark-2          |
// | 9 | city     | city-light-3          | city-dark-3          |
// |10 | minimal  | minimal-solid-light   | minimal-solid-dark   |
// |11 | minimal  | minimal-gradient-light| minimal-gradient-dark|
// |12 | minimal  | minimal-accent-light  | minimal-accent-dark  |

/** Default wallpaper per theme (used on first visit or after reset) */
export const DEFAULT_WALLPAPER_BY_THEME = {
  light: "abstract-light-1",
  dark: "abstract-dark-2",
} as const;

/** Default wallpaper ID (used as final fallback) */
export const DEFAULT_WALLPAPER_ID = DEFAULT_WALLPAPER_BY_THEME.dark;

/** All available wallpapers — strict 1:1 light/dark pairs */
export const WALLPAPERS: WallpaperEntry[] = [
  // ── Abstract ──────────────────────────────────────────────
  // Pair 1: pastel gradient <-> deep nebula
  {
    id: "abstract-light-1",
    category: "abstract",
    src: "/wallpapers/abstract-light-1.webp",
    thumbnail: "/wallpapers/thumbnails/abstract-light-1.webp",
    theme: "light",
    pairId: "abstract-dark-2",
  },
  {
    id: "abstract-dark-2",
    category: "abstract",
    src: "/wallpapers/abstract-dark-2.webp",
    thumbnail: "/wallpapers/thumbnails/abstract-dark-2.webp",
    theme: "dark",
    pairId: "abstract-light-1",
  },
  // Pair 2: watercolor bloom <-> dark waves
  {
    id: "abstract-light-2",
    category: "abstract",
    src: "/wallpapers/abstract-light-2.webp",
    thumbnail: "/wallpapers/thumbnails/abstract-light-2.webp",
    theme: "light",
    pairId: "abstract-dark-1",
  },
  {
    id: "abstract-dark-1",
    category: "abstract",
    src: "/wallpapers/abstract-dark-1.webp",
    thumbnail: "/wallpapers/thumbnails/abstract-dark-1.webp",
    theme: "dark",
    pairId: "abstract-light-2",
  },
  // Pair 3: soft flow <-> dark gradient mesh
  {
    id: "abstract-light-3",
    category: "abstract",
    src: "/wallpapers/abstract-light-3.webp",
    thumbnail: "/wallpapers/thumbnails/abstract-light-3.webp",
    theme: "light",
    pairId: "abstract-dark-3",
  },
  {
    id: "abstract-dark-3",
    category: "abstract",
    src: "/wallpapers/abstract-dark-3.webp",
    thumbnail: "/wallpapers/thumbnails/abstract-dark-3.webp",
    theme: "dark",
    pairId: "abstract-light-3",
  },

  // ── Nature ────────────────────────────────────────────────
  // Pair 4: snowy peaks <-> aurora mountains
  {
    id: "nature-light-1",
    category: "nature",
    src: "/wallpapers/nature-light-1.webp",
    thumbnail: "/wallpapers/thumbnails/nature-light-1.webp",
    theme: "light",
    pairId: "nature-dark-1",
  },
  {
    id: "nature-dark-1",
    category: "nature",
    src: "/wallpapers/nature-dark-1.webp",
    thumbnail: "/wallpapers/thumbnails/nature-dark-1.webp",
    theme: "dark",
    pairId: "nature-light-1",
  },
  // Pair 5: sunlit meadow <-> night sky
  {
    id: "nature-light-2",
    category: "nature",
    src: "/wallpapers/nature-light-2.webp",
    thumbnail: "/wallpapers/thumbnails/nature-light-2.webp",
    theme: "light",
    pairId: "nature-dark-2",
  },
  {
    id: "nature-dark-2",
    category: "nature",
    src: "/wallpapers/nature-dark-2.webp",
    thumbnail: "/wallpapers/thumbnails/nature-dark-2.webp",
    theme: "dark",
    pairId: "nature-light-2",
  },
  // Pair 6: coastal breeze <-> dark forest
  {
    id: "nature-light-3",
    category: "nature",
    src: "/wallpapers/nature-light-3.webp",
    thumbnail: "/wallpapers/thumbnails/nature-light-3.webp",
    theme: "light",
    pairId: "nature-dark-3",
  },
  {
    id: "nature-dark-3",
    category: "nature",
    src: "/wallpapers/nature-dark-3.webp",
    thumbnail: "/wallpapers/thumbnails/nature-dark-3.webp",
    theme: "dark",
    pairId: "nature-light-3",
  },

  // ── City ───────────────────────────────────────────────────
  // Pair 7: New York day <-> New York night
  {
    id: "city-light-1",
    category: "city",
    src: "/wallpapers/city-light-1.webp",
    thumbnail: "/wallpapers/thumbnails/city-light-1.webp",
    theme: "light",
    pairId: "city-dark-1",
  },
  {
    id: "city-dark-1",
    category: "city",
    src: "/wallpapers/city-dark-1.webp",
    thumbnail: "/wallpapers/thumbnails/city-dark-1.webp",
    theme: "dark",
    pairId: "city-light-1",
  },
  // Pair 8: Tokyo day <-> Tokyo night
  {
    id: "city-light-2",
    category: "city",
    src: "/wallpapers/city-light-2.webp",
    thumbnail: "/wallpapers/thumbnails/city-light-2.webp",
    theme: "light",
    pairId: "city-dark-2",
  },
  {
    id: "city-dark-2",
    category: "city",
    src: "/wallpapers/city-dark-2.webp",
    thumbnail: "/wallpapers/thumbnails/city-dark-2.webp",
    theme: "dark",
    pairId: "city-light-2",
  },
  // Pair 9: London day <-> London night
  {
    id: "city-light-3",
    category: "city",
    src: "/wallpapers/city-light-3.webp",
    thumbnail: "/wallpapers/thumbnails/city-light-3.webp",
    theme: "light",
    pairId: "city-dark-3",
  },
  {
    id: "city-dark-3",
    category: "city",
    src: "/wallpapers/city-dark-3.webp",
    thumbnail: "/wallpapers/thumbnails/city-dark-3.webp",
    theme: "dark",
    pairId: "city-light-3",
  },

  // ── Minimal (CSS-only, no image files) ────────────────────
  // Pair 10: solid light <-> solid dark
  {
    id: "minimal-solid-light",
    category: "minimal",
    src: "",
    thumbnail: "",
    css: "#f5f5f7",
    theme: "light",
    pairId: "minimal-solid-dark",
  },
  {
    id: "minimal-solid-dark",
    category: "minimal",
    src: "",
    thumbnail: "",
    css: "#0a0a0a",
    theme: "dark",
    pairId: "minimal-solid-light",
  },
  // Pair 11: light gradient <-> dark gradient
  {
    id: "minimal-gradient-light",
    category: "minimal",
    src: "",
    thumbnail: "",
    css: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    theme: "light",
    pairId: "minimal-gradient-dark",
  },
  {
    id: "minimal-gradient-dark",
    category: "minimal",
    src: "",
    thumbnail: "",
    css: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
    theme: "dark",
    pairId: "minimal-gradient-light",
  },
  // Pair 12: accent-colored abstract gradient
  {
    id: "minimal-accent-light",
    category: "minimal",
    src: "",
    thumbnail: "",
    css: "linear-gradient(135deg, #f5f7fa 0%, color-mix(in srgb, var(--accent) 25%, #f5f7fa) 50%, color-mix(in srgb, var(--accent) 40%, #e8ecf1) 100%)",
    theme: "light",
    pairId: "minimal-accent-dark",
  },
  {
    id: "minimal-accent-dark",
    category: "minimal",
    src: "",
    thumbnail: "",
    css: "linear-gradient(135deg, #0a0a0a 0%, color-mix(in srgb, var(--accent) 20%, #0a0a0a) 50%, color-mix(in srgb, var(--accent) 15%, #111) 100%)",
    theme: "dark",
    pairId: "minimal-accent-light",
  },
];

/** Look up a wallpaper entry by ID. Falls back to the default. */
export function getWallpaper(id: string): WallpaperEntry {
  return (
    WALLPAPERS.find((w) => w.id === id) ??
    WALLPAPERS.find((w) => w.id === DEFAULT_WALLPAPER_ID)!
  );
}

/** Get all wallpapers for a given category */
export function getWallpapersByCategory(
  category: WallpaperCategory,
): WallpaperEntry[] {
  return WALLPAPERS.filter((w) => w.category === category);
}

/** Get all wallpapers matching the given theme */
export function getWallpapersByTheme(theme: "light" | "dark"): WallpaperEntry[] {
  return WALLPAPERS.filter((w) => w.theme === theme);
}

/** Get wallpapers for a category filtered by theme */
export function getWallpapersByCategoryAndTheme(
  category: WallpaperCategory,
  theme: "light" | "dark",
): WallpaperEntry[] {
  return WALLPAPERS.filter(
    (w) => w.category === category && w.theme === theme,
  );
}

/**
 * Get the wallpaper to swap to when the theme changes.
 * With strict 1:1 pairing, this always returns the pair when
 * the current wallpaper's theme doesn't match the new theme.
 * Returns `null` if already matching (no swap needed).
 */
export function getPairedWallpaper(
  currentId: string,
  newTheme: "light" | "dark",
): WallpaperEntry | null {
  const current = getWallpaper(currentId);
  // Already matches the new theme — no swap needed
  if (current.theme === newTheme) return null;
  // Swap to the pair
  return WALLPAPERS.find((w) => w.id === current.pairId) ?? null;
}
