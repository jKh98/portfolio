import type { AccentColor } from "@/types";

/** Accent color preset with value, hover, and glow variants */
export interface AccentColorPreset {
  id: AccentColor;
  /** Main accent color */
  value: string;
  /** Hover variant */
  hover: string;
  /** Glow variant (with alpha) */
  glow: string;
  /** Border accent variant (with alpha) */
  borderAccent: string;
}

/** All available accent color presets */
export const ACCENT_COLORS: Record<AccentColor, AccentColorPreset> = {
  cyan: {
    id: "cyan",
    value: "#06b6d4",
    hover: "#22d3ee",
    glow: "rgba(6, 182, 212, 0.25)",
    borderAccent: "rgba(6, 182, 212, 0.3)",
  },
  purple: {
    id: "purple",
    value: "#8b5cf6",
    hover: "#a78bfa",
    glow: "rgba(139, 92, 246, 0.25)",
    borderAccent: "rgba(139, 92, 246, 0.3)",
  },
  green: {
    id: "green",
    value: "#22c55e",
    hover: "#4ade80",
    glow: "rgba(34, 197, 94, 0.25)",
    borderAccent: "rgba(34, 197, 94, 0.3)",
  },
  amber: {
    id: "amber",
    value: "#f59e0b",
    hover: "#fbbf24",
    glow: "rgba(245, 158, 11, 0.25)",
    borderAccent: "rgba(245, 158, 11, 0.3)",
  },
  rose: {
    id: "rose",
    value: "#f43f5e",
    hover: "#fb7185",
    glow: "rgba(244, 63, 94, 0.25)",
    borderAccent: "rgba(244, 63, 94, 0.3)",
  },
};

/** Apply accent color CSS variables to :root */
export function applyAccentColor(color: AccentColor): void {
  const preset = ACCENT_COLORS[color];
  const root = document.documentElement;
  root.style.setProperty("--accent", preset.value);
  root.style.setProperty("--accent-hover", preset.hover);
  root.style.setProperty("--accent-glow", preset.glow);
  root.style.setProperty("--border-accent", preset.borderAccent);
}
