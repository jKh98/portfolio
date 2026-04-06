import { Suspense, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { useWindowManager } from "@/context";
import {
  useReducedMotion,
  useIsMobile,
  useIsTablet,
  useFocusTrap,
} from "@/hooks";
import { ANIMATION, APP_DEFINITIONS } from "@/constants";
import { WindowHeader } from "./WindowHeader";
import { WindowContent } from "./WindowContent";
import { ResizeHandle } from "./ResizeHandle";
import { SkeletonLoader } from "@/components/ui";
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
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

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

  if (!appDef) return null;

  const AppComponent = appDef.component;
  const title = t(appDef.titleKey);

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.95, opacity: 0 },
        transition: ANIMATION.spring.snappy,
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
        ...(windowState.size && {
          width: windowState.size.width,
          height: windowState.size.height,
          maxWidth: "none",
          maxHeight: "none",
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
          layout={!reducedMotion}
          style={maximizedStyle}
          className={cn(
            "flex flex-col",
            "overflow-hidden",
            "backdrop-blur-xl border",
            "bg-[var(--bg-glass)] border-[var(--border)]",
            "transition-shadow duration-300",
            windowState.isFocused
              ? "shadow-[var(--shadow-lg)]"
              : "shadow-[var(--shadow-md)] opacity-[0.85]",
            // Maximized: no rounded corners, fixed positioning handled by style
            isMaximized && "rounded-none",
            // Mobile: full-screen, no rounded corners
            !isMaximized && isMobile && "absolute inset-0 rounded-none",
            // Tablet: 90% width, centered, no drag, rounded
            !isMaximized &&
              isTablet &&
              "absolute w-[90%] max-h-[80vh] top-[10%] left-1/2 -translate-x-1/2 rounded-xl",
            // Desktop normal: max-width 900px, centered, draggable, rounded
            !isMaximized &&
              isDesktop &&
              "absolute w-full max-w-[900px] max-h-[80vh] top-[10%] left-1/2 -translate-x-1/2 rounded-xl",
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
              minWidth={400}
              minHeight={300}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
