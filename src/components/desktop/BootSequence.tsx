import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { useWindowManager } from "@/context";

const BOOT_TEXT = "> jalkhurfan.com";
const TYPING_CHAR_DELAY = 50; // ms per character
const PHASE_DELAY_BLACK = 200;
const PHASE_DELAY_DOTS = 600;
const PHASE_DELAY_FADE = 400;

type BootPhase = "black" | "typing" | "dots" | "fadeout" | "done";

/**
 * Full-screen boot overlay with typing animation.
 * Checks sessionStorage to skip on subsequent loads.
 * Respects prefers-reduced-motion.
 */
export function BootSequence() {
  const reducedMotion = useReducedMotion();
  const { openWindow } = useWindowManager();
  const [phase, setPhase] = useState<BootPhase>(() => {
    if (sessionStorage.getItem("booted")) return "done";
    return "black";
  });
  const [displayedText, setDisplayedText] = useState("");

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

  // Phase state machine
  useEffect(() => {
    if (phase === "done") return;

    let timer: ReturnType<typeof setTimeout>;

    if (phase === "black") {
      timer = setTimeout(() => setPhase("typing"), PHASE_DELAY_BLACK);
    } else if (phase === "dots") {
      timer = setTimeout(() => setPhase("fadeout"), PHASE_DELAY_DOTS);
    } else if (phase === "fadeout") {
      timer = setTimeout(() => {
        sessionStorage.setItem("booted", "true");
        setPhase("done");
        openWindow("profile");
      }, PHASE_DELAY_FADE);
    }

    return () => clearTimeout(timer);
  }, [phase, openWindow]);

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;

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
  }, [phase]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
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

            {/* Blinking cursor during typing */}
            {phase === "typing" && (
              <span className="animate-pulse text-cyan-400">_</span>
            )}

            {/* Loading dots */}
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
    </AnimatePresence>
  );
}
