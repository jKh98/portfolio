import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { User, RotateCcw, Power, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { useWindowManager } from "@/context";

const GITHUB_REPO = "https://github.com/jKh98/portfolio";

/** Duration (ms) for each phase of the shutdown/restart overlay */
const SHUTDOWN_FADE_IN = 800;
const SHUTDOWN_HOLD = 1200;
const CRT_COLLAPSE_DURATION = 0.4;
const CRT_FLASH_DURATION = 0.15;

type OverlayState =
  | { type: "idle" }
  | { type: "shutting-down" }
  | { type: "restarting" };

export interface BrandingMenuProps {
  onRestart?: () => void;
}

export function BrandingMenu({ onRestart }: BrandingMenuProps) {
  const { t } = useTranslation();
  const { openWindow, dispatch } = useWindowManager();
  const [isOpen, setIsOpen] = useState(false);
  const [overlay, setOverlay] = useState<OverlayState>({ type: "idle" });
  const [crtPhase, setCrtPhase] = useState<"fade" | "collapse" | "done">("fade");
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, close]);

  // Shutdown / restart orchestration
  useEffect(() => {
    if (overlay.type === "idle") return;

    // Phase 1: Fade to black
    setCrtPhase("fade");

    const collapseTimer = setTimeout(() => {
      // Phase 2: CRT collapse (screen squeezes to horizontal line then vanishes)
      setCrtPhase("collapse");
    }, SHUTDOWN_FADE_IN);

    const doneTimer = setTimeout(() => {
      setCrtPhase("done");

      if (overlay.type === "restarting") {
        // Close all windows, start boot sequence behind this overlay, then remove overlay
        dispatch({ type: "CLOSE_ALL" });
        onRestart?.(); // Boot overlay (z-9999) starts behind CRT overlay (z-99999)
        setTimeout(() => {
          setOverlay({ type: "idle" }); // CRT overlay fades out, revealing boot sequence underneath
        }, 200);
      } else {
        // Shutdown: hold black, close all windows, then boot back up
        dispatch({ type: "CLOSE_ALL" });
        setTimeout(() => {
          onRestart?.(); // Start boot sequence behind CRT overlay
          setTimeout(() => {
            setOverlay({ type: "idle" }); // Reveal boot sequence
          }, 200);
        }, SHUTDOWN_HOLD);
      }
    }, SHUTDOWN_FADE_IN + (CRT_COLLAPSE_DURATION + CRT_FLASH_DURATION) * 1000);

    return () => {
      clearTimeout(collapseTimer);
      clearTimeout(doneTimer);
    };
  }, [overlay, dispatch, onRestart]);

  const handleRestart = useCallback(() => {
    close();
    setOverlay({ type: "restarting" });
  }, [close]);

  const handleShutDown = useCallback(() => {
    close();
    setOverlay({ type: "shutting-down" });
  }, [close]);

  const items = [
    { icon: <User size={14} />, label: t("topbar.branding.about"), onClick: () => { openWindow("profile"); close(); } },
    null,
    { icon: <RotateCcw size={14} />, label: t("topbar.branding.restart"), onClick: handleRestart },
    { icon: <Power size={14} />, label: t("topbar.branding.shutDown"), onClick: handleShutDown },
    null,
    { icon: <ExternalLink size={14} />, label: t("topbar.branding.viewSource"), onClick: () => { window.open(GITHUB_REPO, "_blank", "noopener,noreferrer"); close(); } },
  ];

  return (
    <>
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((p) => !p)}
          aria-label={t("topbar.branding.about")}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className={cn(
            "flex items-center gap-1.5",
            "hover:brightness-110 active:scale-95",
            "transition-all duration-150 cursor-pointer",
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center",
              "h-5 w-5 rounded-md text-[10px] font-bold",
              "bg-[var(--accent)] text-white",
            )}
          >
            J
          </span>
          <span className="text-xs font-semibold text-[var(--text-primary)]">
            {t("topbar.name")}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.1 }}
              className={cn(
                "absolute top-full start-0 mt-1 z-[9999]",
                "min-w-[200px] py-1 rounded-lg",
                "backdrop-blur-2xl backdrop-saturate-150 border",
                "bg-[var(--bg-glass)] border-[var(--border)]",
                "shadow-[var(--shadow-lg)]",
              )}
            >
              {items.map((item, idx) =>
                item === null ? (
                  <div key={idx} className="my-1 border-t border-[var(--border)]" role="separator" />
                ) : (
                  <button
                    key={idx}
                    type="button"
                    role="menuitem"
                    onClick={item.onClick}
                    className={cn(
                      "flex items-center gap-2 w-full px-3 py-1.5",
                      "text-xs text-[var(--text-primary)]",
                      "hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]",
                      "transition-colors duration-100 cursor-pointer",
                    )}
                  >
                    <span className="w-4 h-4 flex items-center justify-center shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ),
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Shutdown / Restart CRT overlay — portaled to body */}
      {createPortal(
        <AnimatePresence>
          {overlay.type !== "idle" && (
            <motion.div
              key="power-overlay"
              className="fixed inset-0 z-[99999] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ pointerEvents: "all" }}
            >
              {/* Black background that fades in */}
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: SHUTDOWN_FADE_IN / 1000, ease: "easeInOut" }}
              />

              {/* CRT collapse effect: a bright horizontal line that shrinks and fades */}
              <AnimatePresence>
                {crtPhase === "collapse" && (
                  <motion.div
                    className="absolute left-0 right-0 mx-auto bg-white"
                    style={{ height: 2, top: "50%", translateY: "-50%" }}
                    initial={{
                      width: "100%",
                      opacity: 1,
                      boxShadow: "0 0 30px 10px rgba(255,255,255,0.6), 0 0 60px 20px rgba(120,200,255,0.3)",
                    }}
                    animate={{
                      width: "0%",
                      opacity: 0,
                      boxShadow: "0 0 0px 0px rgba(255,255,255,0), 0 0 0px 0px rgba(120,200,255,0)",
                    }}
                    transition={{
                      width: { duration: CRT_COLLAPSE_DURATION, ease: "easeIn" },
                      opacity: { duration: CRT_COLLAPSE_DURATION + CRT_FLASH_DURATION, ease: "easeIn" },
                      boxShadow: { duration: CRT_COLLAPSE_DURATION + CRT_FLASH_DURATION, ease: "easeOut" },
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Brief white flash at the start of CRT collapse */}
              <AnimatePresence>
                {crtPhase === "collapse" && (
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ opacity: 0.15 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: CRT_FLASH_DURATION, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
