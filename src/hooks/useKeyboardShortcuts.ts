import { useEffect, useCallback } from "react";
import { APP_DEFINITIONS } from "@/constants";
import { useWindowManager } from "@/context";
import type { AppId } from "@/types";

export interface KeyboardShortcutHandlers {
  onSpotlight: () => void;
  onShowShortcuts: () => void;
}

/**
 * Registers global keyboard shortcuts for the desktop shell.
 * Uses Cmd (Mac) / Ctrl (Windows) as modifier.
 */
export function useKeyboardShortcuts({ onSpotlight, onShowShortcuts }: KeyboardShortcutHandlers) {
  const { windows, openWindow, closeWindow, minimizeWindow, focusWindow } = useWindowManager();

  const focusedAppId = (Object.keys(windows) as AppId[]).find(
    (id) => windows[id].isFocused && windows[id].isOpen,
  );
  const openWindowIds = (Object.keys(windows) as AppId[]).filter(
    (id) => windows[id].isOpen && !windows[id].isMinimized,
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isMod = e.metaKey || e.ctrlKey;
    const target = e.target as HTMLElement;
    const inInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

    // Cmd+K: Spotlight (works even in inputs)
    if (isMod && e.key === "k") { e.preventDefault(); onSpotlight(); return; }

    if (inInput) return;

    // Cmd+1-9: Open/focus app by dock position
    if (isMod && e.key >= "1" && e.key <= "9") {
      e.preventDefault();
      const idx = parseInt(e.key, 10) - 1;
      if (idx < APP_DEFINITIONS.length) openWindow(APP_DEFINITIONS[idx].id);
      return;
    }
    // Cmd+W: Close focused window (only when window focused, to avoid closing browser tab)
    if (isMod && e.key === "w" && focusedAppId) { e.preventDefault(); closeWindow(focusedAppId); return; }
    // Cmd+M: Minimize focused window
    if (isMod && e.key === "m" && focusedAppId) { e.preventDefault(); minimizeWindow(focusedAppId); return; }
    // Cmd+`: Cycle to next open window
    if (isMod && e.key === "`") {
      e.preventDefault();
      if (openWindowIds.length === 0) return;
      if (!focusedAppId) { focusWindow(openWindowIds[0]); return; }
      const nextIdx = (openWindowIds.indexOf(focusedAppId) + 1) % openWindowIds.length;
      focusWindow(openWindowIds[nextIdx]);
      return;
    }
    // Escape: Close focused window
    if (e.key === "Escape" && focusedAppId) { closeWindow(focusedAppId); return; }
    // ?: Show shortcuts cheat sheet
    if (e.key === "?") { onShowShortcuts(); return; }
  }, [focusedAppId, openWindowIds, openWindow, closeWindow, minimizeWindow, focusWindow, onSpotlight, onShowShortcuts]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
