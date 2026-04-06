import { useMotionValue } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { useWindowManager } from "@/context";
import { useIsMobile, useIsTablet } from "@/hooks";
import { APP_DEFINITIONS } from "@/constants";
import { DockIcon } from "./DockIcon";

export function Dock() {
  const { t } = useTranslation();
  const { windows, openWindow, focusWindow, restoreWindow } =
    useWindowManager();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const mouseX = useMotionValue(-1);

  // Disable magnification on mobile and tablet
  const enableMagnification = !isMobile && !isTablet;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableMagnification) return;
    mouseX.set(e.clientX);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1);
  };

  const handleIconClick = (id: (typeof APP_DEFINITIONS)[number]["id"]) => {
    const win = windows[id];
    if (!win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      restoreWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <nav
      aria-label="Application dock"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "fixed bottom-3 left-1/2 -translate-x-1/2 z-50",
        "flex items-end px-3 py-2",
        "rounded-2xl backdrop-blur-md border",
        "bg-[var(--bg-glass)] border-[var(--border)]",
        "shadow-[var(--shadow-lg)]",
        isMobile ? "gap-3 bottom-2 px-4" : "gap-2",
      )}
    >
      {APP_DEFINITIONS.map((app, index) => (
        <DockIcon
          key={app.id}
          appId={app.id}
          icon={app.icon}
          label={t(app.titleKey)}
          isActive={windows[app.id].isOpen}
          onClick={() => handleIconClick(app.id)}
          mouseX={mouseX}
          index={index}
          compact={isMobile}
          disableMagnification={!enableMagnification}
        />
      ))}
    </nav>
  );
}
