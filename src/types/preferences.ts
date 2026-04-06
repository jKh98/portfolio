/** Accent color identifier */
export type AccentColor =
  | "blue"
  | "cyan"
  | "teal"
  | "green"
  | "amber"
  | "orange"
  | "red"
  | "rose"
  | "pink"
  | "purple"
  | "indigo";

/** Animation speed setting */
export type AnimationSpeed = "normal" | "fast" | "off";

/** Font size setting */
export type FontSize = "small" | "normal" | "large";

/** Dock icon size setting */
export type DockIconSize = "small" | "medium" | "large";

/** All user-configurable preferences */
export interface Preferences {
  /** Active accent color */
  accentColor: AccentColor;
  /** Dock magnification on hover */
  dockMagnification: boolean;
  /** Dock icon size */
  dockIconSize: DockIconSize;
  /** Animation speed */
  animationSpeed: AnimationSpeed;
  /** Auto-cascade new windows */
  autoCascade: boolean;
  /** Reduce motion override (null = follow system) */
  reduceMotion: boolean | null;
  /** Font size setting */
  fontSize: FontSize;
}

/** Actions dispatched to the preferences reducer */
export type PreferencesAction =
  | { type: "SET_ACCENT_COLOR"; color: AccentColor }
  | { type: "SET_DOCK_MAGNIFICATION"; enabled: boolean }
  | { type: "SET_DOCK_ICON_SIZE"; size: DockIconSize }
  | { type: "SET_ANIMATION_SPEED"; speed: AnimationSpeed }
  | { type: "SET_AUTO_CASCADE"; enabled: boolean }
  | { type: "SET_REDUCE_MOTION"; value: boolean | null }
  | { type: "SET_FONT_SIZE"; size: FontSize }
  | { type: "RESET" };

/** The preferences context value */
export interface PreferencesContextValue {
  preferences: Preferences;
  dispatch: React.Dispatch<PreferencesAction>;
  /** Convenience setters */
  setAccentColor: (color: AccentColor) => void;
  setDockMagnification: (enabled: boolean) => void;
  setDockIconSize: (size: DockIconSize) => void;
  setAnimationSpeed: (speed: AnimationSpeed) => void;
  setAutoCascade: (enabled: boolean) => void;
  setReduceMotion: (value: boolean | null) => void;
  setFontSize: (size: FontSize) => void;
  resetPreferences: () => void;
}
