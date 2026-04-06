import { useCallback, useEffect } from "react";
import { cn } from "@/utils/cn";
import { useWindowManager } from "@/context";
import { APP_DEFINITIONS } from "@/constants";
import { TopBar } from "./TopBar";
import { Dock } from "./Dock";
import { Window } from "@/components/window";
import type { AppId } from "@/types";

export function Desktop() {
  const { windows, closeWindow } = useWindowManager();

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
      <TopBar />

      {/* Main window area */}
      <main className="absolute inset-0 pt-8 pb-20">
        {APP_DEFINITIONS.map((app) => (
          <Window key={app.id} appId={app.id} />
        ))}
      </main>

      <Dock />
    </div>
  );
}
