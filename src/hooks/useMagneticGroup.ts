import { useRef, useCallback, useState } from "react";

export interface MagneticState {
  /** Mouse x relative to the container */
  x: number;
  /** Mouse y relative to the container */
  y: number;
  /** Whether the mouse is inside the container */
  active: boolean;
}

const INITIAL: MagneticState = { x: 0, y: 0, active: false };

/**
 * Track mouse position within a container element.
 * Returns a ref to attach to the container and the current mouse state.
 * Uses a simple state approach for compatibility with Framer Motion.
 */
export function useMagneticGroup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<MagneticState>(INITIAL);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse(INITIAL);
  }, []);

  return {
    containerRef,
    mouse,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  } as const;
}
