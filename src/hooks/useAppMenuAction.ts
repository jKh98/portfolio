import { useEffect } from "react";

const EVENT_NAME = "app-menu-action";

/**
 * Dispatch an app-menu action as a custom DOM event.
 * Used by AppMenu to broadcast actions without prop drilling.
 */
export function dispatchAppMenuAction(action: string): void {
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: action }));
}

/**
 * Subscribe to app-menu actions. Call from any component that needs
 * to react to menu bar commands (e.g. Expand All / Collapse All).
 */
export function useAppMenuAction(handler: (action: string) => void): void {
  useEffect(() => {
    const listener = (e: Event) => {
      handler((e as CustomEvent<string>).detail);
    };
    window.addEventListener(EVENT_NAME, listener);
    return () => window.removeEventListener(EVENT_NAME, listener);
  }, [handler]);
}
