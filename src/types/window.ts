/** Unique identifier for each app window */
export type AppId =
  | "profile"
  | "experience"
  | "skills"
  | "contact"
  | "terminal"
  | "projects"
  | "notepad"
  | "settings"
  | "finder";

/** Runtime state of a single window */
export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  /** Position override from dragging (desktop only) */
  position?: { x: number; y: number };
  /** Size override from resizing (desktop only) */
  size?: { width: number; height: number };
  /** Saved position before maximize (for restore) */
  preMaximizePosition?: { x: number; y: number };
  /** Saved size before maximize (for restore) */
  preMaximizeSize?: { width: number; height: number };
}

/** A single menu item in an app's menu bar */
export interface AppMenuItem {
  /** i18n key for the label */
  labelKey: string;
  /** Action identifier dispatched when clicked */
  action: string;
  /** Keyboard shortcut hint (display only) */
  shortcut?: string;
}

/** A menu group (e.g. "File", "Edit", "View") */
export interface AppMenuGroup {
  /** i18n key for the menu group title */
  titleKey: string;
  items: AppMenuItem[];
}

/** Static definition of an app for the registry */
export interface AppDefinition {
  id: AppId;
  /** i18n key for the window title */
  titleKey: string;
  /** Lucide icon name */
  icon: string;
  /** Lazy-loaded React component */
  component: React.LazyExoticComponent<React.ComponentType>;
  /** Optional per-app menu bar config */
  menuConfig?: AppMenuGroup[];
  /** Optional minimum window width in pixels (default: 400) */
  minWidth?: number;
}

/** Actions dispatched to the window reducer */
export type WindowAction =
  | { type: "OPEN"; id: AppId; autoCascade?: boolean }
  | { type: "OPEN_EXCLUSIVE"; id: AppId }
  | { type: "CLOSE"; id: AppId }
  | { type: "MINIMIZE"; id: AppId }
  | { type: "RESTORE"; id: AppId }
  | { type: "MAXIMIZE"; id: AppId }
  | { type: "UNMAXIMIZE"; id: AppId }
  | { type: "FOCUS"; id: AppId }
  | { type: "UPDATE_POSITION"; id: AppId; position: { x: number; y: number } }
  | {
      type: "UPDATE_SIZE";
      id: AppId;
      size: { width: number; height: number };
    }
  | { type: "CLOSE_ALL" };

/** The window manager context value */
export interface WindowManagerContextValue {
  windows: Record<AppId, WindowState>;
  /** Ordered list of AppIds by z-index (last = top) */
  windowOrder: AppId[];
  dispatch: React.Dispatch<WindowAction>;
  /** Convenience methods */
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  unmaximizeWindow: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
}
