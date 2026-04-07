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
 * plus per-app menus based on the currently focused window's menuConfig,
 * and a "Help" menu with keyboard shortcuts and contextual tips.
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
      { labelKey: "topbar.menu.closeWindow", action: "close-window", shortcut: "Esc" },
      { labelKey: "topbar.menu.closeAll", action: "close-all" },
    ],
  };

  // Help menu — always present, with contextual tips when an app is focused
  const helpItems: AppMenuGroup["items"] = [
    { labelKey: "topbar.menu.keyboardShortcuts", action: "show-shortcuts", shortcut: "?" },
    { labelKey: "topbar.menu.welcomeGuide", action: "show-welcome", separator: true },
  ];

  if (focusedApp) {
    helpItems.push({
      labelKey: "topbar.menu.tipsForApp",
      action: "show-app-tips",
      separator: true,
    });
  }

  const helpMenu: AppMenuGroup = {
    titleKey: "topbar.menu.help",
    items: helpItems,
  };

  // Combine default + per-app menus + help
  const menus: AppMenuGroup[] = [fileMenu, ...(focusedApp?.menuConfig ?? []), helpMenu];

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
              "hover:bg-[var(--accent-subtle)]",
              "transition-colors duration-100",
              "cursor-pointer",
              openMenuIdx === idx && "bg-[var(--accent-subtle)]",
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
                  "backdrop-blur-2xl backdrop-saturate-150 border",
                  "bg-[var(--bg-glass)] border-[var(--border)]",
                  "shadow-[var(--shadow-lg)]",
                )}
              >
                {menu.items.map((item) => (
                  <div key={item.action}>
                    {item.separator && (
                      <div className="border-t border-[var(--border)] my-1 mx-2" />
                    )}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => handleItemClick(item.action)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-1.5",
                        "text-xs text-[var(--text-primary)]",
                        "hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]",
                        "transition-colors duration-100",
                        "cursor-pointer",
                      )}
                    >
                      <span>
                        {item.labelKey === "topbar.menu.tipsForApp" && focusedApp
                          ? t(item.labelKey, { app: t(focusedApp.titleKey) })
                          : t(item.labelKey)}
                      </span>
                      {item.shortcut && (
                        <span className="text-[10px] text-[var(--text-tertiary)] ms-4">
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
