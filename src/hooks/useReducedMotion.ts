import { useEffect, useState } from "react";
import { usePreferences } from "./usePreferences";

/**
 * Detect if motion should be reduced.
 *
 * Priority:
 * 1. `preferences.reduceMotion === true`  → always reduced
 * 2. `preferences.reduceMotion === false` → never reduced (override system)
 * 3. `preferences.reduceMotion === null`  → follow system `prefers-reduced-motion`
 */
export function useReducedMotion(): boolean {
  const { preferences } = usePreferences();

  const [systemPrefersReduced, setSystemPrefersReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) =>
      setSystemPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Explicit preference overrides system setting
  if (preferences.reduceMotion !== null) {
    return preferences.reduceMotion;
  }

  return systemPrefersReduced;
}
