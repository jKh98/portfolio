import { useEffect, useState } from "react";

const TABLET_MIN = 768;
const TABLET_MAX = 1024;

/** Detect if the viewport is tablet-width (768-1024px) */
export function useIsTablet(): boolean {
  const [isTablet, setIsTablet] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= TABLET_MIN && window.innerWidth <= TABLET_MAX;
  });

  useEffect(() => {
    const mq = window.matchMedia(
      `(min-width: ${TABLET_MIN}px) and (max-width: ${TABLET_MAX}px)`,
    );
    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isTablet;
}
