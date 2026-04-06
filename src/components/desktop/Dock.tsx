import { useCallback, useMemo, useRef, useState } from "react";
import { useMotionValue } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { useWindowManager } from "@/context";
import { useIsMobile, useIsTablet } from "@/hooks";
import { APP_DEFINITIONS } from "@/constants";
import { ContextMenu } from "@/components/ui";
import type { ContextMenuItem } from "@/components/ui";
import { DockIcon } from "./DockIcon";
import type { AppId } from "@/types";

export function Dock() {
  const { t } = useTranslation();
  const {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    restoreWindow,
    minimizeWindow,
  } = useWindowManager();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const mouseX = useMotionValue(-1);
  const isDesktop = !isMobile && !isTablet;

  // Long press context menu state
  const [longPressMenu, setLongPressMenu] = useState<{
    isOpen: boolean;
    appId: AppId | null;
    x: number;
    y: number;
  }>({ isOpen: false, appId: null, x: 0, y: 0 });

  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressedRef = useRef(false);

  // Disable magnification on mobile and tablet
  const enableMagnification = !isMobile && !isTablet;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableMagnification) return;
    mouseX.set(e.clientX);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1);
  };

  const handleIconClick = (id: AppId) => {
    if (isLongPressedRef.current) {
      isLongPressedRef.current = false;
      return;
    }
    const win = windows[id];
    if (!win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      restoreWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const handleLongPressStart = useCallback(
    (appId: AppId, e: React.PointerEvent) => {
      if (!isDesktop || e.button !== 0) return;
      isLongPressedRef.current = false;

      longPressTimerRef.current = setTimeout(() => {
        isLongPressedRef.current = true;
        const el = document.querySelector(`[data-dock-icon="${appId}"]`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Estimate menu height (~3 items * 30px + 8px padding)
          const estimatedMenuHeight = 100;
          setLongPressMenu({
            isOpen: true,
            appId,
            x: rect.left + rect.width / 2 - 90,
            y: rect.top - estimatedMenuHeight - 8,
          });
        }
      }, 500);
    },
    [isDesktop],
  );

  const handleLongPressEnd = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const closeLongPressMenu = useCallback(() => {
    setLongPressMenu((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const longPressMenuItems: ContextMenuItem[] = useMemo(() => {
    if (!longPressMenu.appId) return [];
    const win = windows[longPressMenu.appId];
    const id = longPressMenu.appId;

    if (win.isOpen) {
      return [
        {
          label: t("common.close"),
          onClick: () => closeWindow(id),
        },
        {
          label: t("common.minimize"),
          onClick: () => minimizeWindow(id),
        },
        {
          label: t("contextMenu.bringToFront"),
          onClick: () => focusWindow(id),
        },
      ];
    }
    return [
      {
        label: t("contextMenu.open"),
        onClick: () => openWindow(id),
      },
    ];
  }, [
    longPressMenu.appId,
    windows,
    t,
    closeWindow,
    minimizeWindow,
    focusWindow,
    openWindow,
  ]);

  return (
    <>
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
            onPointerDown={
              isDesktop
                ? (e: React.PointerEvent) => handleLongPressStart(app.id, e)
                : undefined
            }
            onPointerUp={isDesktop ? handleLongPressEnd : undefined}
            onPointerLeave={isDesktop ? handleLongPressEnd : undefined}
          />
        ))}
      </nav>

      {/* Long press context menu */}
      {longPressMenu.isOpen && (
        <ContextMenu
          items={longPressMenuItems}
          x={longPressMenu.x}
          y={longPressMenu.y}
          onClose={closeLongPressMenu}
        />
      )}
    </>
  );
}
