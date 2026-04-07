import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion, useIsMobile } from "@/hooks";
import { useWindowManager } from "@/context";
import { trackEvent } from "@/lib/analytics";
import { synthesizeSound } from "@/lib/audio-engine";

const BOOT_TEXT = "> jalkhurfan.com";
const TYPING_CHAR_DELAY = 50; // ms per character
const PHASE_DELAY_BLACK = 500;
const PHASE_DELAY_DOTS = 800;
const PHASE_DELAY_FADE = 500;

type BootPhase = "black" | "typing" | "dots" | "fadeout" | "done";

export interface BootSequenceHandle {
  reboot: () => void;
}

/**
 * Full-screen boot overlay with typing animation.
 * Checks sessionStorage to skip on subsequent loads.
 * Respects prefers-reduced-motion.
 * On mobile: shortened boot (skip typing, just fade in and auto-open profile).
 * Exposes a `reboot()` method via ref for in-app restart (no page reload).
 */
export const BootSequence = forwardRef<BootSequenceHandle>(
  function BootSequence(_props, ref) {
    const reducedMotion = useReducedMotion();
    const isMobile = useIsMobile();
    const { openWindow } = useWindowManager();
    const [phase, setPhase] = useState<BootPhase>(() => {
      if (sessionStorage.getItem("booted")) return "done";
      return "black";
    });
    const [displayedText, setDisplayedText] = useState("");

    // Expose imperative reboot method
    useImperativeHandle(ref, () => ({
      reboot() {
        sessionStorage.removeItem("booted");
        setDisplayedText("");
        setPhase("black");
      },
    }));

    // If reduced motion or already booted, skip entirely and open profile
    useEffect(() => {
      if (phase === "done") return;

      if (reducedMotion) {
        sessionStorage.setItem("booted", "true");
        setPhase("done");
        openWindow("profile");
        return;
      }
    }, [reducedMotion, phase, openWindow]);

    // Mobile: shortened boot - skip typing, just show text briefly and fade out
    useEffect(() => {
      if (phase === "done" || reducedMotion || !isMobile) return;
      if (phase === "black") return; // Let the black phase timer handle transition

      // On mobile, skip typing effect - go straight to fadeout
      if (phase === "typing") {
        setDisplayedText(BOOT_TEXT);
        const timer = setTimeout(() => setPhase("fadeout"), 600);
        return () => clearTimeout(timer);
      }
    }, [phase, isMobile, reducedMotion]);

    // Phase state machine (desktop full typing flow)
    useEffect(() => {
      if (phase === "done") return;
      if (isMobile && phase !== "black" && phase !== "fadeout") return;

      let timer: ReturnType<typeof setTimeout>;

      if (phase === "black") {
        timer = setTimeout(
          () => setPhase("typing"),
          PHASE_DELAY_BLACK,
        );
      } else if (phase === "dots") {
        timer = setTimeout(() => setPhase("fadeout"), PHASE_DELAY_DOTS);
      } else if (phase === "fadeout") {
        timer = setTimeout(() => {
          sessionStorage.setItem("booted", "true");
          setPhase("done");
          openWindow("profile");
          // Play startup chime as boot completes
          try { synthesizeSound("startup", 0.5); } catch { /* ignore */ }
          trackEvent("boot_complete", { skipped: false });
        }, PHASE_DELAY_FADE);
      }

      return () => clearTimeout(timer);
    }, [phase, openWindow, isMobile]);

    // Typing effect (desktop only)
    useEffect(() => {
      if (phase !== "typing" || isMobile) return;

      let charIndex = 0;
      setDisplayedText("");

      const interval = setInterval(() => {
        charIndex++;
        setDisplayedText(BOOT_TEXT.slice(0, charIndex));
        if (charIndex >= BOOT_TEXT.length) {
          clearInterval(interval);
          setPhase("dots");
        }
      }, TYPING_CHAR_DELAY);

      return () => clearInterval(interval);
    }, [phase, isMobile]);

    const isActive = phase !== "done";

    return (
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="boot-overlay"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: phase === "fadeout" ? 0 : 1 }}
            transition={{ duration: PHASE_DELAY_FADE / 1000, ease: "easeOut" }}
          >
            {(phase === "typing" || phase === "dots" || phase === "fadeout") && (
              <div className="flex items-center gap-2 font-mono text-lg text-cyan-400 sm:text-xl">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {displayedText}
                </motion.span>

                {/* Blinking cursor during typing (desktop only) */}
                {phase === "typing" && !isMobile && (
                  <span className="animate-pulse text-cyan-400">_</span>
                )}

                {/* Loading dots (desktop only) */}
                {phase === "dots" && (
                  <span className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400"
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
