import { Suspense, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  X,
  Minus,
  Maximize2,
  ArrowUpToLine,
  ArrowDownToLine,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useWindowManager } from "@/context";
import {
  useReducedMotion,
  useIsMobile,
  useIsTablet,
  useFocusTrap,
  useContextMenu,
  usePreferences,
} from "@/hooks";
import { ANIMATION, APP_DEFINITIONS } from "@/constants";
import { WindowHeader } from "./WindowHeader";
import { WindowContent } from "./WindowContent";
import { ResizeHandle } from "./ResizeHandle";
import { SkeletonLoader, ContextMenu } from "@/components/ui";
import type { ContextMenuItem } from "@/components/ui";
import type { AppId } from "@/types";

/** TopBar height in pixels */
const TOPBAR_HEIGHT = 32;

/** Default window width for constraint calculation */
const DEFAULT_WIDTH = 900;

export interface WindowProps {
  appId: AppId;
}

export function Window({ appId }: WindowProps) {
  const { t } = useTranslation();
  const {
    windows,
    closeWindow,
    minimizeWindow,
    focusWindow,
    toggleMaximize,
    dispatch,
  } = useWindowManager();
  const reducedMotion = useReducedMotion();
  const { preferences } = usePreferences();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);
  const headerContextMenu = useContextMenu();

  const windowState = windows[appId];
  const appDef = APP_DEFINITIONS.find((app) => app.id === appId);
  const isVisible = windowState.isOpen && !windowState.isMinimized;
  const isMaximized = windowState.isMaximized;
  const isDraggable = !isMobile && !isTablet && !isMaximized;
  const isDesktop = !isMobile && !isTablet;

  // Focus trap: active when this window is visible and focused
  const focusTrapRef = useFocusTrap(isVisible && windowState.isFocused);

  const handleFocus = useCallback(() => {
    if (!windowState.isFocused) {
      focusWindow(appId);
    }
  }, [appId, focusWindow, windowState.isFocused]);

  const handleMaximize = useCallback(() => {
    toggleMaximize(appId);
  }, [appId, toggleMaximize]);

  const handleResize = useCallback(
    (size: { width: number; height: number }) => {
      dispatch({ type: "UPDATE_SIZE", id: appId, size });
    },
    [appId, dispatch],
  );

  /**
   * Dynamic drag constraints based on viewport dimensions.
   * - Top: cannot go above TopBar (32px)
   * - Left/Right/Bottom: title bar must remain at least 50% visible
   */
  const dragConstraints = useMemo(() => {
    if (!isDesktop || isMaximized) return undefined;

    const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const winWidth = windowState.size?.width ?? Math.min(DEFAULT_WIDTH, vw);
    const halfTitleBar = winWidth / 2;

    return {
      top: -(vh * 0.1) + TOPBAR_HEIGHT, // Allow up to TopBar
      left: -(vw / 2) + halfTitleBar * 0.5, // Keep 50% of title bar visible
      right: vw / 2 - halfTitleBar * 0.5,
      bottom: vh * 0.6,
    };
  }, [isDesktop, isMaximized, windowState.size]);

  const windowContextMenuItems: ContextMenuItem[] = useMemo(
    () => [
      {
        label: t("common.close"),
        icon: <X size={14} />,
        onClick: () => closeWindow(appId),
      },
      ...(isMobile
        ? []
        : [
            {
              label: t("common.minimize"),
              icon: <Minus size={14} />,
              onClick: () => minimizeWindow(appId),
            },
          ]),
      ...(isDesktop
        ? [
            {
              label: isMaximized ? t("common.restore") : t("common.maximize"),
              icon: <Maximize2 size={14} />,
              onClick: () => toggleMaximize(appId),
              divider: true,
            },
            {
              label: t("contextMenu.bringToFront"),
              icon: <ArrowUpToLine size={14} />,
              onClick: () => focusWindow(appId),
            },
            {
              label: t("contextMenu.sendToBack"),
              icon: <ArrowDownToLine size={14} />,
              onClick: () =>
                dispatch({
                  type: "UPDATE_POSITION",
                  id: appId,
                  position: windowState.position ?? { x: 0, y: 0 },
                }),
            },
          ]
        : []),
    ],
    [
      t,
      appId,
      isMobile,
      isDesktop,
      isMaximized,
      closeWindow,
      minimizeWindow,
      toggleMaximize,
      focusWindow,
      dispatch,
      windowState.position,
    ],
  );

  if (!appDef) return null;

  const AppComponent = appDef.component;
  const title = t(appDef.titleKey);

  const skipAnimation = reducedMotion || preferences.animationSpeed === "off";

  const motionProps = skipAnimation
    ? {}
    : {
        initial: { scale: 0.9, opacity: 0 },
        animate: {
          scale: 1,
          opacity: windowState.isFocused ? 1 : 0.85,
        },
        exit: { scale: 0.95, opacity: 0 },
        transition:
          preferences.animationSpeed === "fast"
            ? ANIMATION.spring.bouncy
            : ANIMATION.spring.snappy,
      };

  // Inline styles for dynamic size and position when maximized
  const maximizedStyle = isMaximized
    ? {
        position: "fixed" as const,
        top: TOPBAR_HEIGHT,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: windowState.zIndex,
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
      }
    : {
        zIndex: windowState.zIndex,
        ...(windowState.size
          ? {
              width: windowState.size.width,
              height: windowState.size.height,
              maxWidth: "none",
              maxHeight: "none",
            }
          : {
              // When no explicit size is set, use max-h as the actual height
              // so overflow-y-auto works inside app content on initial open
              height: isMobile ? "100%" : isTablet ? "80vh" : "80vh",
            }),
      };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={(node: HTMLDivElement | null) => {
            // Combine windowRef and focusTrapRef
            (
              windowRef as React.MutableRefObject<HTMLDivElement | null>
            ).current = node;
            (
              focusTrapRef as React.MutableRefObject<HTMLDivElement | null>
            ).current = node;
          }}
          key={appId}
          role="dialog"
          aria-labelledby={`window-title-${appId}`}
          aria-modal="true"
          drag={isDraggable}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragConstraints={dragConstraints}
          dragElastic={0}
          onPointerDown={handleFocus}
          layout={!skipAnimation}
          style={maximizedStyle}
          className={cn(
            "flex flex-col",
            "overflow-hidden",
            "backdrop-blur-2xl backdrop-saturate-150 border",
            "bg-[var(--bg-glass)] border-[var(--border)]",
            "glass-noise glass-gradient",
            "transition-[box-shadow,border-color,opacity] duration-300",
            windowState.isFocused
              ? "glass-focused"
              : "glass-unfocused shadow-[var(--shadow-md)]",
            // Maximized: no rounded corners, fixed positioning handled by style
            isMaximized && "rounded-none",
            // Mobile: full-screen but leave room for the dock at the bottom
            !isMaximized &&
              isMobile &&
              "absolute inset-x-0 top-0 bottom-16 rounded-none",
            // Tablet: 90% width, centered, no drag, rounded
            !isMaximized &&
              isTablet &&
              "absolute w-[90%] top-[10%] left-1/2 -translate-x-1/2 rounded-xl",
            !isMaximized && isTablet && !windowState.size && "max-h-[80vh]",
            // Desktop normal: centered, draggable, rounded
            // Only apply max-w/max-h when no explicit size is set;
            // once the window has been resized or restored from fullscreen,
            // inline styles control dimensions so CSS constraints must not interfere.
            !isMaximized &&
              isDesktop &&
              "absolute w-full top-[10%] left-1/2 -translate-x-1/2 rounded-xl",
            !isMaximized &&
              isDesktop &&
              !windowState.size &&
              "max-w-[900px] max-h-[80vh]",
          )}
          {...motionProps}
        >
          <div id={`window-title-${appId}`} className="sr-only">
            {title}
          </div>
          <WindowHeader
            title={title}
            onClose={() => closeWindow(appId)}
            onMinimize={isMobile ? undefined : () => minimizeWindow(appId)}
            onMaximize={isDesktop ? handleMaximize : undefined}
            isMaximized={isMaximized}
            dragControls={isDraggable ? dragControls : undefined}
            onContextMenu={isDesktop ? headerContextMenu.open : undefined}
          />
          <WindowContent>
            <Suspense fallback={<SkeletonLoader lines={5} />}>
              <AppComponent />
            </Suspense>
          </WindowContent>
          {/* Resize handles: desktop only, hidden when maximized */}
          {isDesktop && !isMaximized && (
            <ResizeHandle
              windowRef={windowRef}
              onResize={handleResize}
              minWidth={appDef?.minWidth ?? 400}
              minHeight={300}
            />
          )}
          {/* Window title bar context menu */}
          {headerContextMenu.isOpen && (
            <ContextMenu
              items={windowContextMenuItems}
              x={headerContextMenu.x}
              y={headerContextMenu.y}
              onClose={headerContextMenu.close}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
