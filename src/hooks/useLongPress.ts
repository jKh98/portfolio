import { useCallback, useRef } from "react";

export interface UseLongPressOptions {
  /** Threshold in milliseconds (default 500ms) */
  threshold?: number;
  /** Callback when long press is detected */
  onLongPress: () => void;
}

/**
 * Detects long press (pointer down for threshold ms).
 * Returns handlers to bind to the element.
 * Desktop only - does not interfere with regular clicks.
 */
export function useLongPress({
  threshold = 500,
  onLongPress,
}: UseLongPressOptions) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressRef = useRef(false);

  const start = useCallback(
    (e: React.PointerEvent) => {
      // Only primary button
      if (e.button !== 0) return;
      isLongPressRef.current = false;

      timerRef.current = setTimeout(() => {
        isLongPressRef.current = true;
        onLongPress();
      }, threshold);
    },
    [threshold, onLongPress],
  );

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onClick = useCallback((e: React.MouseEvent, fallback?: () => void) => {
    if (isLongPressRef.current) {
      // Long press was triggered, suppress click
      e.preventDefault();
      e.stopPropagation();
      isLongPressRef.current = false;
    } else {
      fallback?.();
    }
  }, []);

  return {
    onPointerDown: start,
    onPointerUp: cancel,
    onPointerLeave: cancel,
    /** Use this as onClick wrapper to suppress click after long press */
    handleClick: onClick,
  };
}
