import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Languages, Info } from "lucide-react";
import { cn } from "@/utils/cn";
import { useWindowManager, useTheme } from "@/context";
import { useIsMobile, useContextMenu, useKeyboardShortcuts } from "@/hooks";
import { APP_DEFINITIONS } from "@/constants";
import { TopBar } from "./TopBar";
import { Dock } from "./Dock";
import { BootSequence } from "./BootSequence";
import type { BootSequenceHandle } from "./BootSequence";
import { Spotlight } from "./Spotlight";
import { ShortcutCheatSheet } from "./ShortcutCheatSheet";
import { Window } from "@/components/window";
import { ContextMenu } from "@/components/ui";
import type { ContextMenuItem } from "@/components/ui";

export function Desktop() {
  const { t, i18n } = useTranslation();
  const { openWindow } = useWindowManager();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const desktopMenu = useContextMenu();
  const bootRef = useRef<BootSequenceHandle>(null);

  // Restart handler: triggers the boot sequence to replay
  const handleRestart = useCallback(() => {
    bootRef.current?.reboot();
  }, []);

  // Spotlight state
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const openSpotlight = useCallback(() => setSpotlightOpen(true), []);
  const closeSpotlight = useCallback(() => setSpotlightOpen(false), []);

  // Shortcut cheat sheet state
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const openShortcuts = useCallback(() => setShortcutsOpen(true), []);
  const closeShortcuts = useCallback(() => setShortcutsOpen(false), []);

  // Register keyboard shortcuts
  useKeyboardShortcuts({
    onSpotlight: openSpotlight,
    onShowShortcuts: openShortcuts,
  });

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
      // Always suppress the native browser context menu
      e.preventDefault();

      // Only show our custom desktop menu on the background (not on nav/dialogs/header)
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
      onContextMenu={handleDesktopContextMenu}
    >
      <BootSequence ref={bootRef} />
      <TopBar
        onSpotlightOpen={openSpotlight}
        onRestart={handleRestart}
      />

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

      {/* Spotlight overlay */}
      <Spotlight isOpen={spotlightOpen} onClose={closeSpotlight} />

      {/* Keyboard shortcuts cheat sheet */}
      <ShortcutCheatSheet isOpen={shortcutsOpen} onClose={closeShortcuts} />
    </div>
  );
}
