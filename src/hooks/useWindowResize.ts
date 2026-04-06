import { useCallback, useRef } from "react";

export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface UseWindowResizeOptions {
  windowRef: React.RefObject<HTMLDivElement | null>;
  onResize: (size: { width: number; height: number }) => void;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

const BODY_CURSOR: Record<ResizeDirection, string> = {
  n: "ns-resize",
  s: "ns-resize",
  e: "ew-resize",
  w: "ew-resize",
  ne: "nesw-resize",
  sw: "nesw-resize",
  nw: "nwse-resize",
  se: "nwse-resize",
};

/**
 * Hook that handles pointer-event-based window resizing.
 * Returns a `startResize` function to bind to resize handles.
 */
export function useWindowResize({
  windowRef,
  onResize,
  minWidth = 400,
  minHeight = 300,
  maxWidth,
  maxHeight,
}: UseWindowResizeOptions) {
  const startRect = useRef({ width: 0, height: 0 });
  const startPointer = useRef({ x: 0, y: 0 });

  const startResize = useCallback(
    (direction: ResizeDirection, e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const el = windowRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      startRect.current = { width: rect.width, height: rect.height };
      startPointer.current = { x: e.clientX, y: e.clientY };

      const maxW = maxWidth ?? window.innerWidth - 32;
      const maxH = maxHeight ?? window.innerHeight - 104;

      const onMove = (me: PointerEvent) => {
        const dx = me.clientX - startPointer.current.x;
        const dy = me.clientY - startPointer.current.y;
        let w = startRect.current.width;
        let h = startRect.current.height;

        if (direction.includes("e")) w += dx;
        if (direction.includes("w")) w -= dx;
        if (direction.includes("s")) h += dy;
        if (direction.includes("n")) h -= dy;

        w = Math.max(minWidth, Math.min(maxW, w));
        h = Math.max(minHeight, Math.min(maxH, h));
        onResize({ width: w, height: h });
      };

      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.body.style.cursor = BODY_CURSOR[direction];
      document.body.style.userSelect = "none";
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    },
    [windowRef, onResize, minWidth, minHeight, maxWidth, maxHeight],
  );

  return { startResize };
}
