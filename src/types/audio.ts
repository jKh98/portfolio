/** Audio feedback sound categories */
export type AudioCategory =
  | "system"       // Boot, shutdown, restart
  | "navigation"   // Spotlight, dock clicks, context menus
  | "window"       // Open, close, minimize, maximize, restore, focus
  | "interaction"  // Toggles, clicks, selections, copy
  | "notification" // Guestbook message, error, welcome
  | "app";         // Terminal, finder, experience cards

/** All available sound effect identifiers */
export type SoundEffect =
  // System
  | "startup"
  | "shutdown"
  | "restart"
  // Navigation
  | "spotlightOpen"
  | "spotlightSelect"
  | "dockLaunch"
  | "contextMenu"
  | "themeToggle"
  | "languageToggle"
  // Window management
  | "windowOpen"
  | "windowClose"
  | "windowMinimize"
  | "windowRestore"
  | "windowMaximize"
  | "windowFocus"
  // Interactions
  | "toggleSwitch"
  | "buttonClick"
  | "tabSwitch"
  | "copyClipboard"
  | "accentColorChange"
  | "wallpaperChange"
  | "sliderChange"
  // Notifications
  | "error"
  | "success"
  | "welcomeModal"
  | "newMessage"
  // App-specific
  | "terminalExecute"
  | "terminalError"
  | "terminalClear"
  | "finderOpen"
  | "finderNavigate"
  | "fileDownload"
  | "guestbookSubmit"
  | "cardExpand"
  | "cardCollapse"
  | "carouselSlide";

/** Audio preferences stored in user preferences */
export interface AudioPreferences {
  /** Master mute toggle */
  muted: boolean;
  /** Master volume level 0-1 */
  volume: number;
  /** Per-category enable/disable */
  categories: Record<AudioCategory, boolean>;
}

/** The mapping of a sound effect to its category */
export interface SoundDefinition {
  /** Which category this sound belongs to */
  category: AudioCategory;
  /** Human-readable label (for settings preview) */
  label: string;
}

/** Audio context value exposed via React context */
export interface AudioContextValue {
  /** Play a sound effect */
  playSound: (sound: SoundEffect) => void;
  /** Current audio preferences */
  audioPrefs: AudioPreferences;
  /** Set master mute */
  setMuted: (muted: boolean) => void;
  /** Set master volume (0–1) */
  setVolume: (volume: number) => void;
  /** Toggle a category on/off */
  setCategoryEnabled: (category: AudioCategory, enabled: boolean) => void;
}
