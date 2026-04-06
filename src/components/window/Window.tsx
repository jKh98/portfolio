import { Suspense, useCallback } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { useWindowManager } from "@/context";
import { useReducedMotion, useIsMobile } from "@/hooks";
import { ANIMATION, APP_DEFINITIONS } from "@/constants";
import { WindowHeader } from "./WindowHeader";
import { WindowContent } from "./WindowContent";
import { SkeletonLoader } from "@/components/ui";
import type { AppId } from "@/types";

export interface WindowProps {
  appId: AppId;
}

export function Window({ appId }: WindowProps) {
  const { t } = useTranslation();
  const { windows, closeWindow, minimizeWindow, focusWindow } =
    useWindowManager();
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const dragControls = useDragControls();

  const windowState = windows[appId];
  const appDef = APP_DEFINITIONS.find((app) => app.id === appId);

  const handleFocus = useCallback(() => {
    if (!windowState.isFocused) {
      focusWindow(appId);
    }
  }, [appId, focusWindow, windowState.isFocused]);

  if (!appDef) return null;

  const AppComponent = appDef.component;
  const title = t(appDef.titleKey);
  const isVisible = windowState.isOpen && !windowState.isMinimized;

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.95, opacity: 0 },
        transition: ANIMATION.spring.snappy,
      };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={appId}
          role="dialog"
          aria-labelledby={`window-title-${appId}`}
          aria-modal="false"
          drag={!isMobile}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragConstraints={{
            top: 0,
            left: -400,
            right: 400,
            bottom: 200,
          }}
          dragElastic={0}
          onPointerDown={handleFocus}
          style={{ zIndex: windowState.zIndex }}
          className={cn(
            "absolute flex flex-col",
            "rounded-xl overflow-hidden",
            "backdrop-blur-xl border",
            "bg-[var(--bg-glass)] border-[var(--border)]",
            "transition-shadow duration-300",
            windowState.isFocused
              ? "shadow-[var(--shadow-lg)]"
              : "shadow-[var(--shadow-md)] opacity-[0.85]",
            isMobile
              ? "inset-0 rounded-none"
              : "w-full max-w-[900px] max-h-[80vh] top-[10%] left-1/2 -translate-x-1/2",
          )}
          {...motionProps}
        >
          <div id={`window-title-${appId}`} className="sr-only">
            {title}
          </div>
          <WindowHeader
            title={title}
            onClose={() => closeWindow(appId)}
            onMinimize={() => minimizeWindow(appId)}
            dragControls={dragControls}
          />
          <WindowContent>
            <Suspense fallback={<SkeletonLoader lines={5} />}>
              <AppComponent />
            </Suspense>
          </WindowContent>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
