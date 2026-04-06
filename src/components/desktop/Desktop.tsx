import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Languages, Info } from "lucide-react";
import { cn } from "@/utils/cn";
import { useWindowManager, useTheme } from "@/context";
import { useIsMobile, useContextMenu } from "@/hooks";
import { APP_DEFINITIONS } from "@/constants";
import { TopBar } from "./TopBar";
import { Dock } from "./Dock";
import { BootSequence } from "./BootSequence";
import { Window } from "@/components/window";
import { ContextMenu } from "@/components/ui";
import type { ContextMenuItem } from "@/components/ui";
import type { AppId } from "@/types";

export function Desktop() {
  const { t, i18n } = useTranslation();
  const { windows, closeWindow, openWindow } = useWindowManager();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const desktopMenu = useContextMenu();

  // Find the currently focused window to handle Escape key
  const focusedAppId = (Object.keys(windows) as AppId[]).find(
    (id) => windows[id].isFocused && windows[id].isOpen,
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && focusedAppId) {
        closeWindow(focusedAppId);
      }
    },
    [focusedAppId, closeWindow],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const toggleLanguage = useCallback(() => {
    const next = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(next);
  }, [i18n]);

  const desktopMenuItems: ContextMenuItem[] = useMemo(
    () => [
      {
        label: t("topbar.switchTheme"),
        icon: theme === "dark" ? <Sun size={14} /> : <Moon size={14} />,
        onClick: toggleTheme,
        divider: true,
      },
      {
        label: t("topbar.switchLanguage"),
        icon: <Languages size={14} />,
        onClick: toggleLanguage,
      },
      {
        label: t("contextMenu.aboutPortfolio"),
        icon: <Info size={14} />,
        onClick: () => openWindow("profile"),
      },
    ],
    [t, theme, toggleTheme, toggleLanguage, openWindow],
  );

  const handleDesktopContextMenu = useCallback(
    (e: React.MouseEvent) => {
      // Only show context menu if clicking on the desktop background (main area)
      const target = e.target as HTMLElement;
      if (
        target.closest("[role='dialog']") ||
        target.closest("nav") ||
        target.closest("header")
      ) {
        return;
      }
      desktopMenu.open(e);
    },
    [desktopMenu],
  );

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden cursor-default")}
      onContextMenu={!isMobile ? handleDesktopContextMenu : undefined}
    >
      <BootSequence />
      <TopBar />

      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only",
          "fixed top-0 left-1/2 -translate-x-1/2 z-[100]",
          "px-4 py-2 rounded-b-lg",
          "bg-[var(--accent)] text-white text-sm font-medium",
          "focus:outline-none",
        )}
      >
        {t("common.skipToMain")}
      </a>

      {/* Main window area */}
      <main
        id="main-content"
        className={cn(
          "absolute inset-0",
          isMobile ? "pt-8 pb-16" : "pt-8 pb-20",
        )}
      >
        {APP_DEFINITIONS.map((app) => (
          <Window key={app.id} appId={app.id} />
        ))}
      </main>

      <Dock />

      {/* Desktop context menu */}
      {desktopMenu.isOpen && (
        <ContextMenu
          items={desktopMenuItems}
          x={desktopMenu.x}
          y={desktopMenu.y}
          onClose={desktopMenu.close}
        />
      )}
    </div>
  );
}
