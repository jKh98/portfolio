import { useWindowResize } from "@/hooks/useWindowResize";
import type { ResizeDirection } from "@/hooks/useWindowResize";

export interface ResizeHandleProps {
  windowRef: React.RefObject<HTMLDivElement | null>;
  onResize: (size: { width: number; height: number }) => void;
  minWidth?: number;
  minHeight?: number;
}

/** Cursor mapping for each direction */
const CURSOR_MAP: Record<ResizeDirection, string> = {
  n: "cursor-ns-resize",
  s: "cursor-ns-resize",
  e: "cursor-ew-resize",
  w: "cursor-ew-resize",
  ne: "cursor-nesw-resize",
  sw: "cursor-nesw-resize",
  nw: "cursor-nwse-resize",
  se: "cursor-nwse-resize",
};

/**
 * Handle definitions: direction + positioning styles.
 * Each handle is an invisible 8px hit area around the window border.
 * Corners are 16x16px for easier grabbing.
 */
const HANDLES: { direction: ResizeDirection; className: string }[] = [
  // Edges (8px thick)
  { direction: "n", className: "absolute -top-1 left-4 right-4 h-2" },
  { direction: "s", className: "absolute -bottom-1 left-4 right-4 h-2" },
  { direction: "e", className: "absolute top-4 -right-1 bottom-4 w-2" },
  { direction: "w", className: "absolute top-4 -left-1 bottom-4 w-2" },
  // Corners (16x16px)
  { direction: "nw", className: "absolute -top-1 -left-1 w-4 h-4" },
  { direction: "ne", className: "absolute -top-1 -right-1 w-4 h-4" },
  { direction: "sw", className: "absolute -bottom-1 -left-1 w-4 h-4" },
  { direction: "se", className: "absolute -bottom-1 -right-1 w-4 h-4" },
];

/**
 * Renders 8 invisible resize handles around a window.
 * Desktop only, hidden when maximized (controlled by parent).
 */
export function ResizeHandle({
  windowRef,
  onResize,
  minWidth = 400,
  minHeight = 300,
}: ResizeHandleProps) {
  const { startResize } = useWindowResize({
    windowRef,
    onResize,
    minWidth,
    minHeight,
  });

  return (
    <>
      {HANDLES.map(({ direction, className }) => (
        <div
          key={direction}
          className={`${className} ${CURSOR_MAP[direction]} z-50`}
          onPointerDown={(e) => startResize(direction, e)}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
