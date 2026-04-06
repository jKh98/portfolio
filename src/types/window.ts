/** Unique identifier for each app window */
export type AppId = "profile" | "experience" | "skills" | "contact";

/** Runtime state of a single window */
export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  zIndex: number;
  /** Position override from dragging (desktop only) */
  position?: { x: number; y: number };
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
}

/** Actions dispatched to the window reducer */
export type WindowAction =
  | { type: "OPEN"; id: AppId }
  | { type: "CLOSE"; id: AppId }
  | { type: "MINIMIZE"; id: AppId }
  | { type: "RESTORE"; id: AppId }
  | { type: "FOCUS"; id: AppId }
  | { type: "UPDATE_POSITION"; id: AppId; position: { x: number; y: number } }
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
}
