import { useEffect, useRef } from "react";
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
  x: number;
  y: number;
  onClose: () => void;
}

/**
 * Glass-styled context menu positioned at pointer coordinates.
 * Renders via portal for z-index safety.
 */
export function ContextMenu({ items, x, y, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Adjust position to keep menu within viewport
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const rect = menu.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let adjustedX = x;
    let adjustedY = y;

    if (x + rect.width > vw) {
      adjustedX = vw - rect.width - 8;
    }
    if (y + rect.height > vh) {
      adjustedY = vh - rect.height - 8;
    }

    menu.style.left = `${adjustedX}px`;
    menu.style.top = `${adjustedY}px`;
  }, [x, y]);

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      className={cn(
        "fixed z-[9999]",
        "min-w-[180px] py-1 rounded-lg",
        "backdrop-blur-xl border",
        "bg-[var(--bg-glass)] border-[var(--border)]",
        "shadow-[var(--shadow-lg)]",
        "animate-in fade-in zoom-in-95 duration-100",
      )}
      style={{ left: x, top: y }}
    >
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
              "hover:bg-[var(--accent)] hover:text-white",
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
