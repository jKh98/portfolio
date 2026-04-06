import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { useWindowManager } from "@/context";
import { useIsMobile } from "@/hooks";
import { APP_DEFINITIONS } from "@/constants";
import { TopBar } from "./TopBar";
import { Dock } from "./Dock";
import { BootSequence } from "./BootSequence";
import { Window } from "@/components/window";
import type { AppId } from "@/types";

export function Desktop() {
  const { t } = useTranslation();
  const { windows, closeWindow } = useWindowManager();
  const isMobile = useIsMobile();

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

  return (
    <div className={cn("relative h-full w-full overflow-hidden")}>
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
    </div>
  );
}
