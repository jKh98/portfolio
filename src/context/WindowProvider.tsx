import { createContext, useCallback, useContext, useReducer } from "react";
import type {
  AppId,
  WindowAction,
  WindowManagerContextValue,
  WindowState,
} from "@/types";

const ALL_APP_IDS: AppId[] = ["profile", "experience", "skills", "contact"];

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
      isFocused: false,
      zIndex: 0,
    };
  }
  return { windows, windowOrder: [], nextZIndex: 1 };
}

function windowReducer(
  state: WindowManagerState,
  action: WindowAction,
): WindowManagerState {
  switch (action.type) {
    case "OPEN": {
      const { id } = action;
      const newOrder = [...state.windowOrder.filter((wId) => wId !== id), id];
      const windows = { ...state.windows };
      // Unfocus all
      for (const appId of ALL_APP_IDS) {
        if (windows[appId].isFocused) {
          windows[appId] = { ...windows[appId], isFocused: false };
        }
      }
      windows[id] = {
        ...windows[id],
        isOpen: true,
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

    case "CLOSE": {
      const { id } = action;
      const newOrder = state.windowOrder.filter((wId) => wId !== id);
      const windows = { ...state.windows };
      windows[id] = {
        ...windows[id],
        isOpen: false,
        isFocused: false,
        isMinimized: false,
        position: undefined,
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
      const windows = { ...state.windows };
      for (const appId of ALL_APP_IDS) {
        if (windows[appId].isFocused) {
          windows[appId] = { ...windows[appId], isFocused: false };
        }
      }
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

    case "FOCUS": {
      const { id } = action;
      const win = state.windows[id];
      if (!win.isOpen || win.isMinimized) return state;
      const newOrder = [...state.windowOrder.filter((wId) => wId !== id), id];
      const windows = { ...state.windows };
      for (const appId of ALL_APP_IDS) {
        if (windows[appId].isFocused) {
          windows[appId] = { ...windows[appId], isFocused: false };
        }
      }
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

export function WindowProvider({ children }: WindowProviderProps) {
  const [state, dispatch] = useReducer(
    windowReducer,
    undefined,
    createInitialState,
  );

  const openWindow = useCallback(
    (id: AppId) => dispatch({ type: "OPEN", id }),
    [],
  );
  const closeWindow = useCallback(
    (id: AppId) => dispatch({ type: "CLOSE", id }),
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
