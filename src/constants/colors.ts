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
  /** Subtle hover background (low-opacity accent) */
  subtle: string;
  /** Border accent variant (with alpha) */
  borderAccent: string;
}

/** All available accent color presets */
export const ACCENT_COLORS: Record<AccentColor, AccentColorPreset> = {
  blue: {
    id: "blue",
    value: "#3b82f6",
    hover: "#60a5fa",
    glow: "rgba(59, 130, 246, 0.25)",
    subtle: "rgba(59, 130, 246, 0.12)",
    borderAccent: "rgba(59, 130, 246, 0.3)",
  },
  cyan: {
    id: "cyan",
    value: "#06b6d4",
    hover: "#22d3ee",
    glow: "rgba(6, 182, 212, 0.25)",
    subtle: "rgba(6, 182, 212, 0.12)",
    borderAccent: "rgba(6, 182, 212, 0.3)",
  },
  teal: {
    id: "teal",
    value: "#14b8a6",
    hover: "#2dd4bf",
    glow: "rgba(20, 184, 166, 0.25)",
    subtle: "rgba(20, 184, 166, 0.12)",
    borderAccent: "rgba(20, 184, 166, 0.3)",
  },
  green: {
    id: "green",
    value: "#22c55e",
    hover: "#4ade80",
    glow: "rgba(34, 197, 94, 0.25)",
    subtle: "rgba(34, 197, 94, 0.12)",
    borderAccent: "rgba(34, 197, 94, 0.3)",
  },
  amber: {
    id: "amber",
    value: "#f59e0b",
    hover: "#fbbf24",
    glow: "rgba(245, 158, 11, 0.25)",
    subtle: "rgba(245, 158, 11, 0.12)",
    borderAccent: "rgba(245, 158, 11, 0.3)",
  },
  orange: {
    id: "orange",
    value: "#f97316",
    hover: "#fb923c",
    glow: "rgba(249, 115, 22, 0.25)",
    subtle: "rgba(249, 115, 22, 0.12)",
    borderAccent: "rgba(249, 115, 22, 0.3)",
  },
  red: {
    id: "red",
    value: "#ef4444",
    hover: "#f87171",
    glow: "rgba(239, 68, 68, 0.25)",
    subtle: "rgba(239, 68, 68, 0.12)",
    borderAccent: "rgba(239, 68, 68, 0.3)",
  },
  rose: {
    id: "rose",
    value: "#f43f5e",
    hover: "#fb7185",
    glow: "rgba(244, 63, 94, 0.25)",
    subtle: "rgba(244, 63, 94, 0.12)",
    borderAccent: "rgba(244, 63, 94, 0.3)",
  },
  pink: {
    id: "pink",
    value: "#ec4899",
    hover: "#f472b6",
    glow: "rgba(236, 72, 153, 0.25)",
    subtle: "rgba(236, 72, 153, 0.12)",
    borderAccent: "rgba(236, 72, 153, 0.3)",
  },
  purple: {
    id: "purple",
    value: "#8b5cf6",
    hover: "#a78bfa",
    glow: "rgba(139, 92, 246, 0.25)",
    subtle: "rgba(139, 92, 246, 0.12)",
    borderAccent: "rgba(139, 92, 246, 0.3)",
  },
  indigo: {
    id: "indigo",
    value: "#6366f1",
    hover: "#818cf8",
    glow: "rgba(99, 102, 241, 0.25)",
    subtle: "rgba(99, 102, 241, 0.12)",
    borderAccent: "rgba(99, 102, 241, 0.3)",
  },
};

/** Apply accent color CSS variables to :root */
export function applyAccentColor(color: AccentColor): void {
  const preset = ACCENT_COLORS[color];
  const root = document.documentElement;
  root.style.setProperty("--accent", preset.value);
  root.style.setProperty("--accent-hover", preset.hover);
  root.style.setProperty("--accent-glow", preset.glow);
  root.style.setProperty("--accent-subtle", preset.subtle);
  root.style.setProperty("--border-accent", preset.borderAccent);
}
