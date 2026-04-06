import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
  /** When true the tooltip is hidden (e.g. context menu takes precedence) */
  disabled?: boolean;
}

const NOTCH_SIZE = 4;
const GAP = 4;

export function Tooltip({
  children,
  content,
  className,
  disabled = false,
}: TooltipProps) {
  const [hovered, setHovered] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{
    left: number;
    top: number;
    notchLeft: number;
    below: boolean;
  }>({ left: 0, top: 0, notchLeft: 0, below: false });
  const [measured, setMeasured] = useState(false);

  const visible = hovered && !disabled;

  // Recompute position when visibility changes
  useLayoutEffect(() => {
    if (!visible) {
      setMeasured(false);
      return;
    }

    const anchor = anchorRef.current;
    const tip = tooltipRef.current;
    if (!anchor || !tip) return;

    const aRect = anchor.getBoundingClientRect();
    const tRect = tip.getBoundingClientRect();
    const vw = window.innerWidth;
    const anchorCenterX = aRect.left + aRect.width / 2;

    let left = anchorCenterX - tRect.width / 2;
    let top = aRect.top - tRect.height - NOTCH_SIZE - GAP;
    let below = false;

    // Clamp horizontal
    if (left < 8) left = 8;
    if (left + tRect.width > vw - 8) left = vw - tRect.width - 8;

    // Flip below if no room above
    if (top < 8) {
      top = aRect.bottom + NOTCH_SIZE + GAP;
      below = true;
    }

    const notchLeft = Math.min(
      Math.max(anchorCenterX - left, 10),
      tRect.width - 10,
    );

    setPos({ left, top, notchLeft, below });
    setMeasured(true);
  }, [visible]);

  return (
    <>
      <div
        ref={anchorRef}
        className={cn("relative inline-flex", className)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            className={cn(
              "fixed z-[9998] pointer-events-none",
              "whitespace-nowrap rounded-md px-2.5 py-1",
              "text-xs font-medium",
              "bg-[var(--bg-surface)] text-[var(--text-primary)]",
              "border border-[var(--border)]",
              "shadow-[var(--shadow-sm)]",
              "transition-opacity duration-150",
              measured ? "opacity-100" : "opacity-0",
            )}
            style={{ left: pos.left, top: pos.top }}
          >
            {content}
            {/* Notch */}
            <span
              className="absolute"
              style={{
                left: pos.notchLeft - NOTCH_SIZE,
                ...(pos.below
                  ? {
                      top: -NOTCH_SIZE,
                      borderLeft: `${NOTCH_SIZE}px solid transparent`,
                      borderRight: `${NOTCH_SIZE}px solid transparent`,
                      borderBottom: `${NOTCH_SIZE}px solid var(--bg-surface)`,
                    }
                  : {
                      bottom: -NOTCH_SIZE,
                      borderLeft: `${NOTCH_SIZE}px solid transparent`,
                      borderRight: `${NOTCH_SIZE}px solid transparent`,
                      borderTop: `${NOTCH_SIZE}px solid var(--bg-surface)`,
                    }),
              }}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
