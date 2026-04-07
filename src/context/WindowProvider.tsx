import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
  useEffect,
} from "react";
import { usePreferences } from "@/hooks";
import { trackEvent } from "@/lib/analytics";
import type {
  AppId,
  WindowAction,
  WindowManagerContextValue,
  WindowState,
} from "@/types";

const ALL_APP_IDS: AppId[] = [
  "profile",
  "experience",
  "skills",
  "contact",
  "terminal",
  "projects",
  "guestbook",
  "settings",
  "finder",
];

/** Cascade offset in pixels per open window */
const CASCADE_OFFSET = 30;

/** TopBar height in pixels */
const TOPBAR_HEIGHT = 32;

interface WindowManagerState {
  windows: Record<AppId, WindowState>;
  windowOrder: AppId[];
  nextZIndex: number;
}

function createInitialState(): WindowManagerState {
  const windows = {} as Record<AppId, WindowState>;
  for (const id of ALL_APP_IDS) {
    windows[id] = {
      id,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      isFocused: false,
      zIndex: 0,
    };
  }
  return { windows, windowOrder: [], nextZIndex: 1 };
}

/**
 * Calculate cascade position for a new window based on the number
 * of currently open windows. Wraps back when off-screen.
 */
function calculateCascadePosition(
  openWindowCount: number,
): { x: number; y: number } | undefined {
  if (openWindowCount === 0) return undefined; // First window uses default centered position

  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  const maxOffsetX = vw * 0.3;
  const maxOffsetY = vh * 0.3;

  let offsetX = openWindowCount * CASCADE_OFFSET;
  let offsetY = openWindowCount * CASCADE_OFFSET;

  // Wrap when cascade would push too far
  if (offsetX > maxOffsetX) {
    offsetX = offsetX % maxOffsetX;
  }
  if (offsetY > maxOffsetY) {
    offsetY = offsetY % maxOffsetY;
  }

  return { x: offsetX, y: offsetY + TOPBAR_HEIGHT };
}

function unfocusAll(
  windows: Record<AppId, WindowState>,
): Record<AppId, WindowState> {
  const updated = { ...windows };
  for (const appId of ALL_APP_IDS) {
    if (updated[appId].isFocused) {
      updated[appId] = { ...updated[appId], isFocused: false };
    }
  }
  return updated;
}

function windowReducer(
  state: WindowManagerState,
  action: WindowAction,
): WindowManagerState {
  switch (action.type) {
    case "OPEN": {
      const { id, autoCascade = true } = action;
      // If already open but minimized, restore it
      if (state.windows[id].isOpen && state.windows[id].isMinimized) {
        return windowReducer(state, { type: "RESTORE", id });
      }
      // If already open and visible, just focus it
      if (state.windows[id].isOpen) {
        return windowReducer(state, { type: "FOCUS", id });
      }
      const newOrder = [...state.windowOrder.filter((wId) => wId !== id), id];
      const windows = unfocusAll(state.windows);
      const cascadePos = autoCascade
        ? calculateCascadePosition(state.windowOrder.length)
        : undefined;
      windows[id] = {
        ...windows[id],
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        isFocused: true,
        zIndex: state.nextZIndex,
        position: cascadePos,
      };
      return {
        windows,
        windowOrder: newOrder,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "OPEN_EXCLUSIVE": {
      // Close all other windows, then open just this one (mobile mode)
      const { id } = action;
      const windows = {} as Record<AppId, WindowState>;
      for (const appId of ALL_APP_IDS) {
        windows[appId] = {
          ...state.windows[appId],
          isOpen: appId === id,
          isMinimized: false,
          isMaximized: false,
          isFocused: appId === id,
          zIndex: appId === id ? state.nextZIndex : 0,
          position: undefined,
          size: undefined,
        };
      }
      return {
        windows,
        windowOrder: [id],
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "CLOSE": {
      const { id } = action;
      const newOrder = state.windowOrder.filter((wId) => wId !== id);
      const windows = { ...state.windows };
      windows[id] = {
        ...windows[id],
        isOpen: false,
        isFocused: false,
        isMinimized: false,
        isMaximized: false,
        position: undefined,
        size: undefined,
      };
      // Focus the next top window
      if (newOrder.length > 0) {
        const topId = newOrder[newOrder.length - 1];
        windows[topId] = { ...windows[topId], isFocused: true };
      }
      return { ...state, windows, windowOrder: newOrder };
    }

    case "MINIMIZE": {
      const { id } = action;
      const windows = { ...state.windows };
      windows[id] = {
        ...windows[id],
        isMinimized: true,
        isFocused: false,
      };
      // Focus next visible window
      const visibleOrder = state.windowOrder.filter(
        (wId) => wId !== id && windows[wId].isOpen && !windows[wId].isMinimized,
      );
      if (visibleOrder.length > 0) {
        const topId = visibleOrder[visibleOrder.length - 1];
        windows[topId] = { ...windows[topId], isFocused: true };
      }
      return { ...state, windows };
    }

    case "RESTORE": {
      const { id } = action;
      const newOrder = [...state.windowOrder.filter((wId) => wId !== id), id];
      const windows = unfocusAll(state.windows);
      windows[id] = {
        ...windows[id],
        isMinimized: false,
        isFocused: true,
        zIndex: state.nextZIndex,
      };
      return {
        windows,
        windowOrder: newOrder,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "MAXIMIZE": {
      const { id } = action;
      const newOrder = [...state.windowOrder.filter((wId) => wId !== id), id];
      const windows = unfocusAll(state.windows);
      const current = state.windows[id];
      windows[id] = {
        ...windows[id],
        isMaximized: true,
        isFocused: true,
        zIndex: state.nextZIndex,
        // Save pre-maximize state for restore
        preMaximizePosition: current.position,
        preMaximizeSize: current.size,
      };
      return {
        windows,
        windowOrder: newOrder,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "UNMAXIMIZE": {
      const { id } = action;
      const current = state.windows[id];
      const windows = { ...state.windows };
      // If there was no pre-maximize size (window was never manually resized),
      // compute a sensible default so the window gets an explicit size
      // that enables resize handles and proper overflow scrolling.
      const fallbackSize = !current.preMaximizeSize
        ? {
            width: Math.min(
              900,
              typeof window !== "undefined" ? window.innerWidth - 64 : 900,
            ),
            height: Math.min(
              typeof window !== "undefined"
                ? window.innerHeight * 0.8
                : 600,
              typeof window !== "undefined" ? window.innerHeight - 104 : 600,
            ),
          }
        : undefined;
      windows[id] = {
        ...windows[id],
        isMaximized: false,
        position: current.preMaximizePosition,
        size: current.preMaximizeSize ?? fallbackSize,
        preMaximizePosition: undefined,
        preMaximizeSize: undefined,
      };
      return { ...state, windows };
    }

    case "FOCUS": {
      const { id } = action;
      const win = state.windows[id];
      if (!win.isOpen || win.isMinimized) return state;
      const newOrder = [...state.windowOrder.filter((wId) => wId !== id), id];
      const windows = unfocusAll(state.windows);
      windows[id] = {
        ...windows[id],
        isFocused: true,
        zIndex: state.nextZIndex,
      };
      return {
        windows,
        windowOrder: newOrder,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "UPDATE_POSITION": {
      const { id, position } = action;
      const windows = { ...state.windows };
      windows[id] = { ...windows[id], position };
      return { ...state, windows };
    }

    case "UPDATE_SIZE": {
      const { id, size } = action;
      const windows = { ...state.windows };
      windows[id] = { ...windows[id], size };
      return { ...state, windows };
    }

    case "CLOSE_ALL": {
      return createInitialState();
    }

    default:
      return state;
  }
}

const WindowContext = createContext<WindowManagerContextValue | null>(null);

export interface WindowProviderProps {
  children: React.ReactNode;
}

const MOBILE_BREAKPOINT = 768;

export function WindowProvider({ children }: WindowProviderProps) {
  const [state, dispatch] = useReducer(
    windowReducer,
    undefined,
    createInitialState,
  );

  // Track mobile state via ref to avoid re-renders
  const isMobileRef = useRef(
    typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = (e: MediaQueryListEvent) => {
      isMobileRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Read autoCascade preference via ref to avoid re-creating callbacks
  const { preferences } = usePreferences();
  const autoCascadeRef = useRef(preferences.autoCascade);
  useEffect(() => {
    autoCascadeRef.current = preferences.autoCascade;
  }, [preferences.autoCascade]);

  const openWindow = useCallback((id: AppId) => {
    trackEvent("app_open", { app_id: id });
    if (isMobileRef.current) {
      dispatch({ type: "OPEN_EXCLUSIVE", id });
    } else {
      dispatch({ type: "OPEN", id, autoCascade: autoCascadeRef.current });
    }
  }, []);
  const closeWindow = useCallback(
    (id: AppId) => {
      trackEvent("app_close", { app_id: id });
      dispatch({ type: "CLOSE", id });
    },
    [],
  );
  const minimizeWindow = useCallback(
    (id: AppId) => dispatch({ type: "MINIMIZE", id }),
    [],
  );
  const restoreWindow = useCallback(
    (id: AppId) => dispatch({ type: "RESTORE", id }),
    [],
  );
  const focusWindow = useCallback(
    (id: AppId) => dispatch({ type: "FOCUS", id }),
    [],
  );
  const maximizeWindow = useCallback(
    (id: AppId) => dispatch({ type: "MAXIMIZE", id }),
    [],
  );
  const unmaximizeWindow = useCallback(
    (id: AppId) => dispatch({ type: "UNMAXIMIZE", id }),
    [],
  );
  const toggleMaximize = useCallback(
    (id: AppId) => {
      const win = state.windows[id];
      if (win?.isMaximized) {
        dispatch({ type: "UNMAXIMIZE", id });
      } else {
        dispatch({ type: "MAXIMIZE", id });
      }
    },
    [state.windows],
  );

  return (
    <WindowContext.Provider
      value={{
        windows: state.windows,
        windowOrder: state.windowOrder,
        dispatch,
        openWindow,
        closeWindow,
        minimizeWindow,
        restoreWindow,
        focusWindow,
        maximizeWindow,
        unmaximizeWindow,
        toggleMaximize,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindowManager(): WindowManagerContextValue {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindowManager must be used within a WindowProvider");
  }
  return context;
}
