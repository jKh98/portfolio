import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { useWindowManager } from "@/context";
import { APP_DEFINITIONS } from "@/constants";
import { dispatchAppMenuAction } from "@/hooks";
import type { AppId, AppMenuGroup } from "@/types";

/** Actions emitted by the app menu */
export type AppMenuAction = string;

/**
 * Dynamic menu bar shown in the TopBar. Displays "File" menu always,
 * plus per-app menus based on the currently focused window's menuConfig.
 * Actions are broadcast via custom DOM events (useAppMenuAction).
 */
export function AppMenu() {
  const { t } = useTranslation();
  const { windows, closeWindow, dispatch } = useWindowManager();
  const [openMenuIdx, setOpenMenuIdx] = useState<number | null>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);

  // Find focused window's app definition
  const focusedAppId = (Object.keys(windows) as AppId[]).find(
    (id) => windows[id].isFocused && windows[id].isOpen,
  );
  const focusedApp = focusedAppId
    ? APP_DEFINITIONS.find((a) => a.id === focusedAppId)
    : undefined;

  // Default File menu
  const fileMenu: AppMenuGroup = {
    titleKey: "topbar.menu.file",
    items: [
      { labelKey: "topbar.menu.closeWindow", action: "close-window", shortcut: "\u2318W" },
      { labelKey: "topbar.menu.closeAll", action: "close-all" },
    ],
  };

  // Combine default + per-app menus
  const menus: AppMenuGroup[] = [fileMenu, ...(focusedApp?.menuConfig ?? [])];

  const handleItemClick = useCallback(
    (action: string) => {
      setOpenMenuIdx(null);
      if (action === "close-window" && focusedAppId) {
        closeWindow(focusedAppId);
      } else if (action === "close-all") {
        dispatch({ type: "CLOSE_ALL" });
      } else {
        dispatchAppMenuAction(action);
      }
    },
    [focusedAppId, closeWindow, dispatch],
  );

  // Click-away to dismiss
  useEffect(() => {
    if (openMenuIdx === null) return;
    const handler = (e: MouseEvent) => {
      if (
        menuBarRef.current &&
        !menuBarRef.current.contains(e.target as Node)
      ) {
        setOpenMenuIdx(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenuIdx]);

  return (
    <div ref={menuBarRef} className="flex items-center gap-0.5">
      {menus.map((menu, idx) => (
        <div key={menu.titleKey} className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenMenuIdx((prev) => (prev === idx ? null : idx))
            }
            onMouseEnter={() => {
              if (openMenuIdx !== null) setOpenMenuIdx(idx);
            }}
            className={cn(
              "px-2 py-0.5 rounded text-xs",
              "text-[var(--text-primary)]",
              "hover:bg-[var(--bg-glass-hover)]",
              "transition-colors duration-100",
              "cursor-pointer",
              openMenuIdx === idx && "bg-[var(--bg-glass-hover)]",
            )}
          >
            {t(menu.titleKey)}
          </button>

          <AnimatePresence>
            {openMenuIdx === idx && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, scale: 0.95, y: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -2 }}
                transition={{ duration: 0.1 }}
                className={cn(
                  "absolute top-full start-0 mt-0.5 z-[9999]",
                  "min-w-[180px] py-1 rounded-lg",
                  "backdrop-blur-xl border",
                  "bg-[var(--bg-glass)] border-[var(--border)]",
                  "shadow-[var(--shadow-lg)]",
                )}
              >
                {menu.items.map((item) => (
                  <button
                    key={item.action}
                    type="button"
                    role="menuitem"
                    onClick={() => handleItemClick(item.action)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-1.5",
                      "text-xs text-[var(--text-primary)]",
                      "hover:bg-[var(--accent)] hover:text-white",
                      "transition-colors duration-100",
                      "cursor-pointer",
                    )}
                  >
                    <span>{t(item.labelKey)}</span>
                    {item.shortcut && (
                      <span className="text-[10px] text-[var(--text-tertiary)] ms-4">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
