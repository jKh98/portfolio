import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";

export interface ContextMenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  /** Optional divider after this item */
  divider?: boolean;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  onClose: () => void;
  /** Anchor element to position relative to (centered above, with notch) */
  anchorEl?: HTMLElement | null;
  /** Fallback raw coordinates (used when no anchorEl, e.g. right-click on desktop) */
  x?: number;
  y?: number;
}

const NOTCH_SIZE = 6;
const GAP = 6;

/**
 * Glass-styled context menu.
 * - With `anchorEl`: renders centered above the anchor with a notch pointing down.
 * - With `x`/`y`: renders at pointer coordinates (no notch).
 * Renders via portal for z-index safety.
 */
export function ContextMenu({
  items,
  onClose,
  anchorEl,
  x,
  y,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{
    left: number;
    top: number;
    notchLeft: number;
  }>({ left: 0, top: 0, notchLeft: 0 });
  const [ready, setReady] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("top left");

  // Compute position after first render so we can measure the menu
  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const rect = menu.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (anchorEl) {
      const anchor = anchorEl.getBoundingClientRect();
      const anchorCenterX = anchor.left + anchor.width / 2;

      // Ideal: centered above the anchor
      let left = anchorCenterX - rect.width / 2;
      let top = anchor.top - rect.height - NOTCH_SIZE - GAP;
      let flippedBelow = false;

      // Clamp horizontal
      if (left < 8) left = 8;
      if (left + rect.width > vw - 8) left = vw - rect.width - 8;

      // If no room above, flip below
      if (top < 8) {
        top = anchor.bottom + NOTCH_SIZE + GAP;
        flippedBelow = true;
      }

      // Notch points to anchor center
      const notchLeft = Math.min(
        Math.max(anchorCenterX - left, 12),
        rect.width - 12,
      );

      setPos({ left, top, notchLeft });
      // Origin at the notch position (bottom-center when above, top-center when below)
      setTransformOrigin(
        flippedBelow
          ? `${notchLeft}px top`
          : `${notchLeft}px bottom`,
      );
    } else {
      // Raw x/y mode (desktop right-click)
      let adjustedX = x ?? 0;
      let adjustedY = y ?? 0;

      // Compute origin relative to the menu before clamping
      const originX = adjustedX;
      const originY = adjustedY;

      if (adjustedX + rect.width > vw) adjustedX = vw - rect.width - 8;
      if (adjustedY + rect.height > vh) adjustedY = vh - rect.height - 8;
      if (adjustedX < 8) adjustedX = 8;
      if (adjustedY < 8) adjustedY = 8;

      setPos({ left: adjustedX, top: adjustedY, notchLeft: 0 });
      // Origin at the actual click point relative to the menu's final position
      setTransformOrigin(
        `${originX - adjustedX}px ${originY - adjustedY}px`,
      );
    }

    setReady(true);
  }, [anchorEl, x, y]);

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const showNotch = !!anchorEl;
  // Determine if menu is below the anchor (flipped)
  const isBelow =
    anchorEl &&
    ready &&
    pos.top > anchorEl.getBoundingClientRect().bottom;

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      className={cn(
        "fixed z-[9999]",
        "min-w-[180px] py-1 rounded-lg",
        "backdrop-blur-2xl backdrop-saturate-150 border",
        "bg-[var(--bg-glass)] border-[var(--border)]",
        "shadow-[var(--shadow-lg)]",
        ready ? "context-menu-enter" : "opacity-0",
      )}
      style={{ left: pos.left, top: pos.top, transformOrigin }}
    >
      {/* Notch / arrow */}
      {showNotch && ready && (
        <span
          className="absolute border-[var(--border)]"
          style={{
            left: pos.notchLeft - NOTCH_SIZE,
            ...(isBelow
              ? {
                  top: -NOTCH_SIZE,
                  borderLeft: `${NOTCH_SIZE}px solid transparent`,
                  borderRight: `${NOTCH_SIZE}px solid transparent`,
                  borderBottom: `${NOTCH_SIZE}px solid var(--bg-glass)`,
                }
              : {
                  bottom: -NOTCH_SIZE,
                  borderLeft: `${NOTCH_SIZE}px solid transparent`,
                  borderRight: `${NOTCH_SIZE}px solid transparent`,
                  borderTop: `${NOTCH_SIZE}px solid var(--bg-glass)`,
                }),
          }}
        />
      )}

      {items.map((item, idx) => (
        <div key={idx}>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className={cn(
              "flex items-center gap-2 w-full px-3 py-1.5",
              "text-xs text-[var(--text-primary)]",
              "hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]",
              "transition-colors duration-100",
              "cursor-pointer",
            )}
          >
            {item.icon && (
              <span className="w-4 h-4 flex items-center justify-center shrink-0">
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
          </button>
          {item.divider && (
            <div
              className="my-1 border-t border-[var(--border)]"
              role="separator"
            />
          )}
        </div>
      ))}
    </div>,
    document.body,
  );
}
