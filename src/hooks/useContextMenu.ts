import { useCallback, useEffect, useState } from "react";

export interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
}

/**
 * Hook that manages right-click context menu state.
 * Returns position + visibility and handlers to open/close.
 */
export function useContextMenu() {
  const [state, setState] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
  });

  const open = useCallback((e: React.MouseEvent | MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setState({ isOpen: true, x: e.clientX, y: e.clientY });
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Click-away dismissal
  useEffect(() => {
    if (!state.isOpen) return;

    const handleClick = () => close();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    // Use requestAnimationFrame to avoid closing immediately
    requestAnimationFrame(() => {
      document.addEventListener("click", handleClick);
      document.addEventListener("contextmenu", handleClick);
      document.addEventListener("keydown", handleEscape);
    });

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [state.isOpen, close]);

  return { ...state, open, close };
}
